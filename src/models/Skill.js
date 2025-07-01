const { Model } = require('objection');

class Skill extends Model {
  static get tableName() {
    return 'skills';
  }

  static get relationMappings() {
    const Job = require('./Job');
    const User = require('./User');

    return {
      jobs: {
        relation: Model.ManyToManyRelation,
        modelClass: Job,
        join: {
          from: 'skills.id',
          through: {
            from: 'job_skills.skill_id',
            to: 'job_skills.job_id',
          },
          to: 'jobs.id',
        },
      },
      candidates: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'skills.id',
          through: {
            from: 'candidate_skills.skill_id',
            to: 'candidate_skills.candidate_id',
          },
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Skill;
