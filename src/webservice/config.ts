// config
// ./2.3/users/{517757}/questions?order=desc&sort=activity&site=stackoverflow
const host = 'api.stackexchange.com/2.3/users';
const suffix = '/questions?order=desc&sort=activity&site=stackoverflow';
const baseUrl = `https://${host}/`;

export default {
  baseUrl,
  suffix,
};
