import { useState } from 'react'
import Form from '../forms/Form'
import { getRecipes } from '../../services/api'
import RecipesList from '../lists/RecipesList'
import Loading from '../layout/Loading'

const recipesResponse = [
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/1ce/1ce91d406dbc2bc21e59b346c6db7911.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLWVhc3QtMSJIMEYCIQCbYLfCR5oB8QqqXTzb7xbD6u8oSN06MF1F5HvzS4eUfQIhALIw7vyu85Q%2Br0CGqg%2F7aYMOM9JitbflvFudimp2aYkUKsEFCMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTg3MDE3MTUwOTg2IgxY0y1SNnpfysqjDn4qlQUhNMWl26QohMpl1AAzLGtczRUXwSyQiZ7I9NI8XnKHm3QwKVOxm0W4%2FJgKT0E3HBAAP7%2ByEiYxZTRr4dVCNvQ0YubNFx0YQFFlnzsn7R2NNIS6xNDONA8hT2f%2FSb0umgmIcY14gu0kK7ul0wkrL8z%2F5eAoi%2BBCmjinr1NuJd6AgzsvAozCaJwJbMxQV5eBUpASic1tUeVRbBcORLo18XguyVcDFNpeEN0x3TsH7Nfip66bHIDPHOoHMmTsuWCMowPI5x7NxQxY1vT%2BXinp%2FBZOTmrH6AgaYX439w9Dabta%2F9SsK%2B%2FVn6PDGgSFqaphr0gPThBg3hsXo%2Fns%2BT7xot8R%2BvORmFKubnSDeKiDTkc578j7JQNsK1%2Bjorfs%2F1bPfCTC8AqS9L%2BfCSQpIjJ3zP2BfVYQAxLUAq4jzRVSd%2FjEHhB%2B4uyA7GH4sdCvAJW94SO8Uq2tKf11GG3AFTeLjew8Fmo13%2Bs6mbKO0g0l9pAcalpbV4pwt3X07m72lx2t2UerRB7anydbDmoQ74F1%2BHmkpGvZSlZGZaY7L1qIrt4gI73ca91Rzgtr%2FpZeGc22huMuohzOKrYIYd09He3EEgLivA0vZy%2Fy2PX2DD93pONqY9n5kY5rn5fl3oJ5hnuzqOXFCjaDgib1a0iLvbzI8mOdksL1bDyS6qn6%2BRuZ1eHi7FEg3e83gn6twKKt7PaWVDzluWAofnmzD%2BpstI8H9n1v3eUMa%2BjjLZEjKu8BHMTnqcwP0W6qD3zIswmc699L41wHK5lstf33%2BFELdD94oLYio9eO3dT7dmoVmd39cioJskww5RAZ4lumVoU5nnQu2D95HZDO5OqJhechD1VChUgFL0oU5v5zKWcCLWP24sNRR7kiGj%2F4MKvrssYGOrAB8xYe4hw1cW7yVeIcIYgOWGiwOV9h16u%2F9B2Mpkm%2FCIjtFVWcxmgKP4QRrBXgP2iaFX5n44eOF5fp9EdtC5Pwuk4omrU4MQsAMnHEQ6xhkTE%2BM7J5VWKoAMHSDx8zIDBpkNeEV8yc44%2Fhy4ZmXXFgYhy4uKvA89RS07PxRjK5d7IoIgs5Y9GhTELaqpIsD1G9u%2FeXxfH7BYw83xFUvjhTqOi36sozuDHE9rj7mS3hqTg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250919T022357Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFE7TVLZ2A%2F20250919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=99f809bd195191f7906f098dca344dd823da737b4561eee5e9504cafcb7dcd74',
    label: 'Beef tacos',
    source: 'BBC Good Food',
    url: 'https://www.bbcgoodfood.com/recipes/next-level-minced-beef-tacos'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/889/889546cbc92e8d88fd428d0e33f6440d.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLWVhc3QtMSJIMEYCIQCbYLfCR5oB8QqqXTzb7xbD6u8oSN06MF1F5HvzS4eUfQIhALIw7vyu85Q%2Br0CGqg%2F7aYMOM9JitbflvFudimp2aYkUKsEFCMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTg3MDE3MTUwOTg2IgxY0y1SNnpfysqjDn4qlQUhNMWl26QohMpl1AAzLGtczRUXwSyQiZ7I9NI8XnKHm3QwKVOxm0W4%2FJgKT0E3HBAAP7%2ByEiYxZTRr4dVCNvQ0YubNFx0YQFFlnzsn7R2NNIS6xNDONA8hT2f%2FSb0umgmIcY14gu0kK7ul0wkrL8z%2F5eAoi%2BBCmjinr1NuJd6AgzsvAozCaJwJbMxQV5eBUpASic1tUeVRbBcORLo18XguyVcDFNpeEN0x3TsH7Nfip66bHIDPHOoHMmTsuWCMowPI5x7NxQxY1vT%2BXinp%2FBZOTmrH6AgaYX439w9Dabta%2F9SsK%2B%2FVn6PDGgSFqaphr0gPThBg3hsXo%2Fns%2BT7xot8R%2BvORmFKubnSDeKiDTkc578j7JQNsK1%2Bjorfs%2F1bPfCTC8AqS9L%2BfCSQpIjJ3zP2BfVYQAxLUAq4jzRVSd%2FjEHhB%2B4uyA7GH4sdCvAJW94SO8Uq2tKf11GG3AFTeLjew8Fmo13%2Bs6mbKO0g0l9pAcalpbV4pwt3X07m72lx2t2UerRB7anydbDmoQ74F1%2BHmkpGvZSlZGZaY7L1qIrt4gI73ca91Rzgtr%2FpZeGc22huMuohzOKrYIYd09He3EEgLivA0vZy%2Fy2PX2DD93pONqY9n5kY5rn5fl3oJ5hnuzqOXFCjaDgib1a0iLvbzI8mOdksL1bDyS6qn6%2BRuZ1eHi7FEg3e83gn6twKKt7PaWVDzluWAofnmzD%2BpstI8H9n1v3eUMa%2BjjLZEjKu8BHMTnqcwP0W6qD3zIswmc699L41wHK5lstf33%2BFELdD94oLYio9eO3dT7dmoVmd39cioJskww5RAZ4lumVoU5nnQu2D95HZDO5OqJhechD1VChUgFL0oU5v5zKWcCLWP24sNRR7kiGj%2F4MKvrssYGOrAB8xYe4hw1cW7yVeIcIYgOWGiwOV9h16u%2F9B2Mpkm%2FCIjtFVWcxmgKP4QRrBXgP2iaFX5n44eOF5fp9EdtC5Pwuk4omrU4MQsAMnHEQ6xhkTE%2BM7J5VWKoAMHSDx8zIDBpkNeEV8yc44%2Fhy4ZmXXFgYhy4uKvA89RS07PxRjK5d7IoIgs5Y9GhTELaqpIsD1G9u%2FeXxfH7BYw83xFUvjhTqOi36sozuDHE9rj7mS3hqTg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250919T022357Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFE7TVLZ2A%2F20250919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e5737f96ba9765f3f98366ef83f1e9b89489febb5fd4b507482abb707e2ddd72',
    label: 'Beef Kidneys',
    source: 'Martha Stewart',
    url: 'https://www.marthastewart.com/2124965/canned-beans-explainer'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/fdb/fdbf70c97bdfb86dc33e2dbab97dd847.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLWVhc3QtMSJIMEYCIQCbYLfCR5oB8QqqXTzb7xbD6u8oSN06MF1F5HvzS4eUfQIhALIw7vyu85Q%2Br0CGqg%2F7aYMOM9JitbflvFudimp2aYkUKsEFCMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTg3MDE3MTUwOTg2IgxY0y1SNnpfysqjDn4qlQUhNMWl26QohMpl1AAzLGtczRUXwSyQiZ7I9NI8XnKHm3QwKVOxm0W4%2FJgKT0E3HBAAP7%2ByEiYxZTRr4dVCNvQ0YubNFx0YQFFlnzsn7R2NNIS6xNDONA8hT2f%2FSb0umgmIcY14gu0kK7ul0wkrL8z%2F5eAoi%2BBCmjinr1NuJd6AgzsvAozCaJwJbMxQV5eBUpASic1tUeVRbBcORLo18XguyVcDFNpeEN0x3TsH7Nfip66bHIDPHOoHMmTsuWCMowPI5x7NxQxY1vT%2BXinp%2FBZOTmrH6AgaYX439w9Dabta%2F9SsK%2B%2FVn6PDGgSFqaphr0gPThBg3hsXo%2Fns%2BT7xot8R%2BvORmFKubnSDeKiDTkc578j7JQNsK1%2Bjorfs%2F1bPfCTC8AqS9L%2BfCSQpIjJ3zP2BfVYQAxLUAq4jzRVSd%2FjEHhB%2B4uyA7GH4sdCvAJW94SO8Uq2tKf11GG3AFTeLjew8Fmo13%2Bs6mbKO0g0l9pAcalpbV4pwt3X07m72lx2t2UerRB7anydbDmoQ74F1%2BHmkpGvZSlZGZaY7L1qIrt4gI73ca91Rzgtr%2FpZeGc22huMuohzOKrYIYd09He3EEgLivA0vZy%2Fy2PX2DD93pONqY9n5kY5rn5fl3oJ5hnuzqOXFCjaDgib1a0iLvbzI8mOdksL1bDyS6qn6%2BRuZ1eHi7FEg3e83gn6twKKt7PaWVDzluWAofnmzD%2BpstI8H9n1v3eUMa%2BjjLZEjKu8BHMTnqcwP0W6qD3zIswmc699L41wHK5lstf33%2BFELdD94oLYio9eO3dT7dmoVmd39cioJskww5RAZ4lumVoU5nnQu2D95HZDO5OqJhechD1VChUgFL0oU5v5zKWcCLWP24sNRR7kiGj%2F4MKvrssYGOrAB8xYe4hw1cW7yVeIcIYgOWGiwOV9h16u%2F9B2Mpkm%2FCIjtFVWcxmgKP4QRrBXgP2iaFX5n44eOF5fp9EdtC5Pwuk4omrU4MQsAMnHEQ6xhkTE%2BM7J5VWKoAMHSDx8zIDBpkNeEV8yc44%2Fhy4ZmXXFgYhy4uKvA89RS07PxRjK5d7IoIgs5Y9GhTELaqpIsD1G9u%2FeXxfH7BYw83xFUvjhTqOi36sozuDHE9rj7mS3hqTg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250919T022357Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFE7TVLZ2A%2F20250919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=fdac36b147f247b0b64e2e95bb627faaa27848ee0d72258a364042d68dfd873d',
    label: 'Beef Tea',
    source: 'Epicurious',
    url: 'https://www.epicurious.com/recipes/food/views/beef-tea-395253'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/951/951a42caf41583c068caae59f8414112.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLWVhc3QtMSJIMEYCIQCbYLfCR5oB8QqqXTzb7xbD6u8oSN06MF1F5HvzS4eUfQIhALIw7vyu85Q%2Br0CGqg%2F7aYMOM9JitbflvFudimp2aYkUKsEFCMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTg3MDE3MTUwOTg2IgxY0y1SNnpfysqjDn4qlQUhNMWl26QohMpl1AAzLGtczRUXwSyQiZ7I9NI8XnKHm3QwKVOxm0W4%2FJgKT0E3HBAAP7%2ByEiYxZTRr4dVCNvQ0YubNFx0YQFFlnzsn7R2NNIS6xNDONA8hT2f%2FSb0umgmIcY14gu0kK7ul0wkrL8z%2F5eAoi%2BBCmjinr1NuJd6AgzsvAozCaJwJbMxQV5eBUpASic1tUeVRbBcORLo18XguyVcDFNpeEN0x3TsH7Nfip66bHIDPHOoHMmTsuWCMowPI5x7NxQxY1vT%2BXinp%2FBZOTmrH6AgaYX439w9Dabta%2F9SsK%2B%2FVn6PDGgSFqaphr0gPThBg3hsXo%2Fns%2BT7xot8R%2BvORmFKubnSDeKiDTkc578j7JQNsK1%2Bjorfs%2F1bPfCTC8AqS9L%2BfCSQpIjJ3zP2BfVYQAxLUAq4jzRVSd%2FjEHhB%2B4uyA7GH4sdCvAJW94SO8Uq2tKf11GG3AFTeLjew8Fmo13%2Bs6mbKO0g0l9pAcalpbV4pwt3X07m72lx2t2UerRB7anydbDmoQ74F1%2BHmkpGvZSlZGZaY7L1qIrt4gI73ca91Rzgtr%2FpZeGc22huMuohzOKrYIYd09He3EEgLivA0vZy%2Fy2PX2DD93pONqY9n5kY5rn5fl3oJ5hnuzqOXFCjaDgib1a0iLvbzI8mOdksL1bDyS6qn6%2BRuZ1eHi7FEg3e83gn6twKKt7PaWVDzluWAofnmzD%2BpstI8H9n1v3eUMa%2BjjLZEjKu8BHMTnqcwP0W6qD3zIswmc699L41wHK5lstf33%2BFELdD94oLYio9eO3dT7dmoVmd39cioJskww5RAZ4lumVoU5nnQu2D95HZDO5OqJhechD1VChUgFL0oU5v5zKWcCLWP24sNRR7kiGj%2F4MKvrssYGOrAB8xYe4hw1cW7yVeIcIYgOWGiwOV9h16u%2F9B2Mpkm%2FCIjtFVWcxmgKP4QRrBXgP2iaFX5n44eOF5fp9EdtC5Pwuk4omrU4MQsAMnHEQ6xhkTE%2BM7J5VWKoAMHSDx8zIDBpkNeEV8yc44%2Fhy4ZmXXFgYhy4uKvA89RS07PxRjK5d7IoIgs5Y9GhTELaqpIsD1G9u%2FeXxfH7BYw83xFUvjhTqOi36sozuDHE9rj7mS3hqTg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250919T022357Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFE7TVLZ2A%2F20250919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=952ab7422c27b889925441bb5c7002f28d71f0dcddc713dc22a718ea0f687f41',
    label: 'Easy roast beef',
    source: 'BBC Good Food',
    url: 'https://www.bbcgoodfood.com/recipes/roast-beef-carrots-easy-gravy'
  }
]

const RecipesContainer = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [recipes, setRecipes] = useState([])
  const [ingredient, setIngredient] = useState(null)

  const { navigation } = props

  const fetchRecipes = async () => {
    setIsLoading(true)

    const recipes = await getRecipes(ingredient)

    setRecipes(recipesResponse)

    setIsLoading(false)
  }

  const handleInputChange = ingredient => {
    setIngredient(ingredient)
  }

  return (
    <>
      <Form onInputChange={handleInputChange} onSubmit={fetchRecipes} />
      {isLoading ? <Loading /> : <RecipesList navigation={navigation} recipes={recipes} />}
    </>
  )
}

export default RecipesContainer
