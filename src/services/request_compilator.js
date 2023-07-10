const request = async (method, url, data) => {
    try {
        const user = localStorage.getItem('auth');
        const auth = JSON.parse(user || {})

        let headers = {}

        if (auth.token) {
            headers['Authorization'] = `Token ${auth.token}`
        }

        let requestBulder;

        if (method === "GET") {
            requestBulder = fetch(url, {headers});
        } else {
            requestBulder = fetch(url, {
                method,
                headers: {
                    ...headers,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
        }
        const response = await requestBulder;

        const result = await response.json();

        return result;

    } catch (error) {
        console.log(error)
    }
};

export const get = request.bind({}, "GET");
export const post = request.bind({}, "POST");
export const put = request.bind({}, "PUT");
export const del = request.bind({}, "DELETE");