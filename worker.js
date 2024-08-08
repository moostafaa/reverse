addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

const hashDictionary = {
    "3vxLCPNMwK/dyohagf8fAg==": "https://hls.yourtime.live/hls"
};

async function handleRequest(request) {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(part => part);

    if (pathParts.length < 2) {
        return new Response('Invalid URL format', { status: 400 });
    }

    const hashId = pathParts[0];
    const otherPartsOfUrl = pathParts.slice(1).join('/');

    const upstreamUrl = hashDictionary[hashId];
    if (!upstreamUrl) {
        return new Response('Invalid HASHID', { status: 404 });
    }

    const targetUrl = `${upstreamUrl}/${otherPartsOfUrl}`;
    const response = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers
    });

    return response;
}