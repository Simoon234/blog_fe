interface FetchPost {
    email: string;
    password: string;
}

export const fetchDataPost = async (url: string, method: string, obj: FetchPost, error: any) => {
    try {
        const res = await fetch(url, {
            method,
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json'
            },
            credentials: "include"
        });
        return res.json();
    } catch (e: any) {
        throw new Error(error)
    }

}