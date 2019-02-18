// vendors
import axios from 'axios'

export default async function(storeViewConfig) {
  let items = []

  try {
    const res = await axios(`/${storeViewConfig.code}/V1/products`, {
      method: 'GET',
      params: {
        searchCriteria: {
          filter_groups: [
            {
              filters: [
                {
                  field: 'id',
                  value: '%',
                  condition_type: 'like',
                },
              ],
            },
          ],
        },
      },
    })

    if (res.data && res.data.items) {
      items = res.data.items
    }
  } catch (error) {
    console.log(error)
  }

  return items.map(item => ({
    ...item,
    __type: 'magento__product',
    storeViewConfig___NODE: storeViewConfig.id,
    magento_id: item.id,
    parent: null,
    children: [],
  }))
}
