const firebaseStorage = {
  methods: {
    uploadSingleFile(folder, file) {
      if (!file) return

      const storage = this.$fire.storage
      const fileName = `${folder}/${file.name.split('.')[0]}-${new Date().getTime()}`
      const itemRef = storage.ref(fileName)
      const metadata = {
        contentType: file.type
      }

      return itemRef
        .put(file, metadata)
        .then(snapshot => {
          return snapshot.ref.getDownloadURL().then(url => {
            return {
              link: url,
              name: file.name
            }
          })
        })
        .catch(err => {
          throw err
        })
    }
  }
}

export default firebaseStorage
