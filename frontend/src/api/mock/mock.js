import { exampleController } from 'api/mock/example-controller';

export function makeDelayFakeAnswer (method = () => undefined, timeout = 500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(method());
    }, timeout);
  });
}
// function makeDelayError (timeout = 100) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(new ErrorMessage(ERRORS.fakeErrorInMockApi));
//     }, 1000);
//   });
// }

export const mockApi = {
  ...exampleController,
  information () {
    const appVersion = VERSION;
    // console.log(`request: 'information', response: '${appVersion}'`);
    return makeDelayFakeAnswer(() => ({
      appVersion,
    }));
  },
};
