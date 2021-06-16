import {Response, createServer} from 'miragejs'

export function makeServer(environment = 'development') {
    return createServer({
        environment,

        routes() {
            this.namespace = 'api';

            this.get('v1/metadata/browse', () => {
                const data = [
                    {
                        id: 1,
                        serviceName: 'service a'
                    },
                    {
                        id: 2,
                        serviceName: 'service b'
                    }
                ]
                return new Response(200, { 'Content-Type': 'application/json' }, data)
            })
        }
    })
}

export function makeServerForCypress() {
    if (window.Cypress) {
      const otherDomains = [];
      const methods = ['head', 'get', 'put', 'patch', 'post', 'delete'];
      createServer({
        environment: 'test',
        routes() {
          for (const domain of ['/*', ...otherDomains]) {
            for (const method of methods) {
              this[method](`${domain}`, async (_, request) => {
                const [status, headers, body] = await window.handleFromCypress(
                  request
                );
                return new Response(status, headers, body);
              });
            }
          }
        },
      });
    }
  }