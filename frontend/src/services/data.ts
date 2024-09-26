export function getStrapiURL() {
    return "http://127.0.0.1:1337";
}

// bearer = true, only works in client component because of cookies recovery library
export async function getStrapiData(path: string, qs: string, authToken: string | undefined = undefined) {
    const baseUrl = getStrapiURL();

    const url = new URL(path, baseUrl);
    url.search = qs;

    const options: RequestInit = {
        // de-comment for prod
        cache: "no-store",
        // next: {
        //   revalidate: 43200, // 12 hours
        // },
        headers: {
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
    };

    try {
        const req = await fetch(url.href, options);
        const res = await req.json();

        return (res);
    } catch (error) {
        console.error(error);
    }
}