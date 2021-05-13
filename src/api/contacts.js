const apiURL = 'https://609c32762b549f00176e5332.mockapi.io/api/contacts';


export const getAll = async () => {
    let response = null;
    await fetch(apiURL)
        .then(rspn => rspn.json())
        .then(rspn => {
            response = rspn
        })
        .catch(err => {
            console.error('err', err);
        });
    return response;
}

export const getOne = async (id) => {
    let response = null;
    await fetch(`${apiURL}/${id}`)
        .then(rspn => rspn.json())
        .then(rspn => {
            response = rspn
        })
        .catch(err => {
            console.error('err', err);
        });
    return response;
}

export const add = async (data) => {
    let response = null;
    await fetch(apiURL, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(rspn => rspn.json())
        .then(rspn => {
            response = rspn
        })
        .catch(err => {
            console.error('err', err);
        });
    return response;
}

export const edit = async (id, data) => {
    let response = null;
    await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
        .then(rspn => rspn.json())
        .then(rspn => {
            response = rspn
        })
        .catch(err => {
            console.error('err', err);
        });
    return response;
}

export const deleteOne = async (id) => {
    let response = null;
    await fetch(`${apiURL}/${id}`, {
            method: 'DELETE'
        })
        .then(rspn => rspn.json())
        .then(rspn => {
            response = rspn
        })
        .catch(err => {
            console.error('err', err);
        });
    return response;
}
