import axioss from 'axios';

var axios = axioss.create({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
})

const updateToken = () => {
    axios = axioss.create({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
}

export {axios, updateToken};