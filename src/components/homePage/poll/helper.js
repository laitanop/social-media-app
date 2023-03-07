import { maxBy, includes } from 'lodash';

export function isNegative(num) {
    if (Math.sign(num) === -1) {
        return true;
    }

    return false;
}

export function sumVotes(votes) {
    let sum = 0;
    votes.forEach((vote) => {
        sum += vote.voters;
    });

    return sum;
}
export function getPercentage(vote, sum) {
    return (vote / sum) * 100;
}

export function getHighestVote(list) {
    const max = maxBy(list, 'voters').voters;
    return max;
}

export function getBackgroundColor(list, voters) {
    return getHighestVote(list) === voters ? '#80c5f7' : '#d0d9de';
}

export function getWidth(voters, message) {
    return `${getPercentage(voters, sumVotes(message.poll.list))
        .toFixed(2)
        .toString()}%`;
}

export function userVoted(message, user) {
    const voted = includes(message.poll.votersUsers, user.toString());
    return voted;
}
