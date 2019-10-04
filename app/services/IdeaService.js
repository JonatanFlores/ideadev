const moment = require('moment');

class IdeaService {
    constructor() {
        this.ideas = [];
    }

    async find() {
        return this.ideas;
    }

    async create(data) {
        const idea = {
            id: this.ideas.length,
            text: data.text,
            tech: data.tech,
            viewer: data.viewer,
            time: moment().format('h:mm:ss a')
        }

        this.ideas.push(idea);

        return idea;
    }
}

module.exports = IdeaService;