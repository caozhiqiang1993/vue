var storage = {
	get (Storage_key) {
		return window.localStorage.getItem(Storage_key)
	},
	set (Storage_key,items) {
		window.localStorage.setItem(Storage_key, items)
	},
	remove (Storage_key){
		window.localStorage.removeItem(Storage_key)
	}
}

export default storage;