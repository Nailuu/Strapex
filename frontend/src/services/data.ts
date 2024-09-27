export function getStrapiURL() {
    return "http://strapi:8080";
}

// bearer = true, only works in client component because of cookies recovery library
export async function getStrapiData(path: string, qs: string, authToken: string | undefined = undefined) {
    const baseUrl = getStrapiURL();

    const url = new URL(path, baseUrl);
    url.search = qs;

    const options: RequestInit = {
        // cache: "no-store",
        next: {
            revalidate: 3600,
        },
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