import axiosApi from "./api"

export const objectController = {
    getAllObject() {
        const url = '/get-all-object'
        return axiosApi.get(url)
    },
    getObject(id) {
        const url = `/get-object/${id}`
        return axiosApi.get(url)
    },
    getAllRanking() {
        const url = '/get-all-ranking'
        return axiosApi.get(url)
    },
    getAllChildren(parent) {
        const url = `/get-all-children/${parent}`
        return axiosApi.get(url)
    },
    getDataObject(parentId) {
        const url = `/get-data-object/${parentId}`
        return axiosApi.get(url)
    },
    addObject(name, email, url, pointText, ratioText, point, ratio, parent, data, group) {
        const urlServer = '/add-object'
        const payload = {
            name: name,
            email: email,
            url: url,
            pointText: pointText,
            ratioText: ratioText,
            point: point,
            ratio: ratio,
            parent: parent,
            data: data,
            group: group
        }
        return axiosApi.post(urlServer, payload)
    },
    editObject(id, name, pointText, ratioText, point, ratio) {
        const url = '/edit-object'
        const payload = {
            id: id,
            name: name,
            pointText: pointText,
            ratioText: ratioText,
            point: point,
            ratio: ratio
        }
        return axiosApi.post(url, payload)
    },
    rankingGroup(group) {
        const url = '/ranking-group'
        const payload = { group: group }
        return axiosApi.post(url, payload)
    },
    removeObject(id) {
        const url = '/removeObject'
        const payload = { id: id }
        return axiosApi.post(url, payload)
    },
    addDataObject(parentId, name, type, data) {
        const url = '/add-data-object'
        const payload = {
            parentId: parentId,
            name: name,
            type: type,
            data: data
        }
        return axiosApi.post(url, payload)
    },
    removeDataObject(parentId, data) {
        const url = '/remove-data-object'
        const payload = {
            parentId: parentId,
            data: data
        }
        return axiosApi.post(url, payload)
    }
}