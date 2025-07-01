const { Model } = require('objection');

class Application extends Model {
  static get tableName() {
    return 'applications';
  }

  static get relationMappings() {
    const User = require('./User');
    const Job = require('./Job');

    return {
      candidate: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'applications.candidate_id',
          to: 'users.id',
        },
      },
      job: {
        relation: Model.BelongsToOneRelation,
        modelClass: Job,
        join: {
          from: 'applications.job_id',
          to: 'jobs.id',
        },
      },
    };
  }
}

module.exports = Application;
