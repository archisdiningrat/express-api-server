'use strict';

const { HttpResponse } = require('../utils/helpers');
const Repository = require('../repositories');

exports.profile = async (req, res, next) => {
    try {
        const Repo = new Repository();

        /** Example of SQL use */
        const user = await Repo.get('user').findOne({ uuid: req.auth.uuid }, ['id', 'name', 'username']);

        /** Example of mongo use */
        await Repo.get('log').create({ action: 'view_profile' });

        /** Example of redis use */
        await Repo.get('job').create(new Date().getTime(), `send email to ${req.auth.uuid}`);

        return HttpResponse(res, 'successfully retrieved profile data', {
            name: user.name,
            username: user.username
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = exports;
