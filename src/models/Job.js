const { Model } = require('objection');

class Job extends Model {
  static get tableName() {
    return 'jobs';
  }

  static get relationMappings() {
    const User = require('./User');
    const Skill = require('./Skill');
    const Application = require('./Application');

    return {
      employer: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'jobs.employer_id',
          to: 'users.id',
        },
      },
      skills: {
        relation: Model.ManyToManyRelation,
        modelClass: Skill,
        join: {
          from: 'jobs.id',
          through: {
            from: 'job_skills.job_id',
            to: 'job_skills.skill_id',
          },
          to: 'skills.id',
        },
      },
      applications: {
        relation: Model.HasManyRelation,
        modelClass: Application,
        join: {
          from: 'jobs.id',
          to: 'applications.job_id',
        },
      },
    };
  }
}

module.exports = Job;
