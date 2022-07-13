const baseUrl = 'http://localhost:3000';
const myc = (method, wxn) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + wxn.url || '',
			method: method,
			data: wxn.data || '',
			success: (res) => {
				resolve(res)
			}
		})
	})
}
const api = {
	get: (wxn) => myc('GET', wxn),
	post: (wxn) => myc('POST', wxn)
}
export default api
