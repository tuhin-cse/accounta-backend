export const userLogin = async (req, res) => {
    try {

        console.log(req.body)

        return res.status(200).send({
            error: false,
            message: "User logged in successfully."
        })

    } catch (e) {
        return res.status(500).send({
            error: true,
            message: "Something went wrong."
        })
    }
}