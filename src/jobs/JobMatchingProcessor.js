const User = require('../models/User');
const Job = require('../models/Job');

const processJobMatching = async (job) => {
  try {
    const jobToMatch = await Job.query().findById(job.data.jobId).withGraphFetched('skills');
    if (!jobToMatch) {
      console.log(`Job with ID ${job.data.jobId} not found.`);
      return;
    }

    const candidates = await User.query()
      .where('role', 'candidate')
      .withGraphFetched('skills');

    const jobSkills = new Set(jobToMatch.skills.map(s => s.id));

    for (const candidate of candidates) {
      let score = 0;

      // 1. Skill match
      const candidateSkills = new Set(candidate.skills.map(s => s.id));
      const commonSkills = new Set([...jobSkills].filter(x => candidateSkills.has(x)));
      if (commonSkills.size > 0) {
        score++;
      }

      // 2. Location match
      if (candidate.location_preference && jobToMatch.location.toLowerCase().includes(candidate.location_preference.toLowerCase())) {
        score++;
      }

      // 3. Salary match (check for overlap)
      // 3. Salary match (check for overlap)
      // A salary match contributes 1 point if the candidate's desired range overlaps with the job's offered range.
      if ((candidate.salary_min && jobToMatch.salary_max && candidate.salary_min <= jobToMatch.salary_max) ||
          (candidate.salary_max && jobToMatch.salary_min && candidate.salary_max >= jobToMatch.salary_min)) {
        score++;
      }

      // If there's a reasonable match, log a notification
      // A more sophisticated system would use a better scoring and threshold
      if (score >= 2) { // Example threshold
        console.log(`[Notification] Found a potential match: Candidate #${candidate.id} for Job #${jobToMatch.id}`);
      }
    }
  } catch (error) {
    console.error(`Error processing job matching for job ID ${job.data.jobId}:`, error);
  }
};

module.exports = processJobMatching;
