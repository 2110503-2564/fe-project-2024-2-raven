export default async function getCoworkingSpace(id:string) {
    const response = await fetch(`http://localhost:5000/api/v1/coworkingspaces/${id}`)
    if(!response.ok) {
        throw new Error('Failed to fetch coworking space')
    }

    return await response.json()
}   