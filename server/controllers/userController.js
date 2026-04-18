// Get User Profile and Recent Searches [GET '/']
export const getUserProfile = async (req,res)=>{
    try {
        const role = req.user.role
        const recentSearchedCities = req.user.recentSearchedCities
        res.json({success:true, role, recentSearchedCities})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

// Add a new city to the user's recent search history [POST '/store-recent-search']
export const addRecentSearchCity = async (req,res)=>{
    try {
        const {recentSearchedCities} = req.body
        const user = await req.user

        if(user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCities)
        } else {
            user.recentSearchedCities.shift()
            user.recentSearchedCities.push(recentSearchedCities)
        }
        await user.save()

        res.json({success:true, message: "City Added"})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}