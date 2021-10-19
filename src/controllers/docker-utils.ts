import Docker from 'dockerode';
const docker = new Docker({socketPath: "/var/run/docker.sock"});

type DockerContainer = {
  id: string
  host: string
  port: Number
}

export const createContainer = async (image: string): Promise<DockerContainer> => {
  const stream = await docker.pull(image)
  await new Promise((resolve, reject) => {
    docker.modem.followProgress(stream, (err, res) =>
      err ? reject(err) : resolve(res)
    );
  });
  const container = await docker.createContainer({
    Image: image,
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    OpenStdin: false,
    StdinOnce: false,
    HostConfig: {
      PortBindings: {
        '8080/tcp': [{
          'HostPort': "0"
        }]
      }
    }
  })
    .then((container) => {
      container.start()
      return container
    })
  await new Promise(r => setTimeout(r, 2000));
  const port = (await container.inspect()).NetworkSettings.Ports['8080/tcp'][0].HostPort
  const response: DockerContainer = {
    id: container.id,
    host: '',
    port: Number(port)
  }
  console.log(response)
  return response
}
