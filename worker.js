export default {
  async fetch(request) {
    const HttpStatusCodeUnauthorized = 401;
    const HttpStatusCodeNotFound = 404;
    const HttpStatusCodeBadRequest = 400;

    const imgAcctHash = '258S6uFyUNu72Meq9IYdEw';
    const imgID = new URL(request.url).pathname.split('/').filter(e => e);

    if (imgID.length < 2) {
      return new Response('better double check that url real quick', { status: HttpStatusCodeBadRequest });
    }

    const variant = imgID.length < 3 ? 'gamma=0' : imgID.pop();
    const zone = imgID.shift();

    if (zone === 'private') {
      return new Response('go away', { status: HttpStatusCodeUnauthorized });
    }

    if (zone === 'public') {
      return fetch(`https://imagedelivery.net/${imgAcctHash}/${imgID}/${variant}`, { headers: request.headers });
    }

    return new Response('well then...', { status: HttpStatusCodeNotFound });

  }
};