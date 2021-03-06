export default function(entities) {
  const medias = entities.filter(({ __type }) => __type === 'magento__media')

  return entities.map(entity => {
    // const { storeViewConfigCode } = entity

    if (entity.__type === 'magento__product') {
      if (entity.image && entity.image !== 'no_selection') {
        const media = medias.find(
          m =>
            // m.storeViewConfigCode === storeViewConfigCode &&
            m.file === entity.image,
        )

        if (media) {
          entity.image___NODE = media.id
        }
      }
      delete entity.image

      if (entity.small_image && entity.small_image !== 'no_selection') {
        const media = medias.find(
          m =>
            // m.storeViewConfigCode === storeViewConfigCode &&
            m.file === entity.small_image,
        )

        if (media) {
          entity.small_image___NODE = media.id
        }
      }
      delete entity.small_image

      if (entity.thumbnail && entity.thumbnail !== 'no_selection') {
        const media = medias.find(
          m =>
            // m.storeViewConfigCode === storeViewConfigCode &&
            m.file === entity.thumbnail,
        )
        if (media) {
          entity.thumbnail___NODE = media.id
        }
      }
      delete entity.thumbnail

      if (entity.swatch_image && entity.swatch_image !== 'no_selection') {
        const media = medias.find(
          m =>
            // m.storeViewConfigCode === storeViewConfigCode &&
            m.file === entity.swatch_image,
        )

        if (media) {
          entity.swatch_image___NODE = media.id
        }
      }
      delete entity.swatch_image

      if (
        entity.media_gallery_entries &&
        entity.media_gallery_entries.length > 0
      ) {
        entity.media_gallery_entries___NODE = entity.media_gallery_entries.map(
          e => {
            const { id } = medias.find(
              m =>
                // m.storeViewConfigCode === storeViewConfigCode &&
                m.file === e.file,
            )
            return id
          },
        )
      }
      delete entity.media_gallery_entries
    }

    return entity
  })
}
