const express = require("express")
const schema = require("../db/schema")
const axios = require("axios")
const router = express.Router()

/* Get all supervisors */
router.get("/supervisors", async (req, res, next) => {
    try {
        const resp = await axios.get("https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers")
        const data = resp.data || []
        const _filteredDt = data.filter((it) => {
            return isNaN(it.jurisdiction)
        })
        _filteredDt.sort(function (a, b) {
            const kAj = a.jurisdiction
            const kBj = b.jurisdiction
            const kAln = a.lastName
            const kBln = b.lastName
            const kAfn = a.firstName
            const kBfn = b.firstName
            return kAj.localeCompare(kBj) || kAln.localeCompare(kBln) || kAfn.localeCompare(kBfn)
        })
        const result = _filteredDt.map((it) => {
            return `${it.jurisdiction} - ${it.lastName}, ${it.firstName}`
        })
        res.json(result)
    } catch (error) {
        next(error)
    }
})

/* Create a new notification */
router.post('/submit', async (req, res, next) => {
    try {
      const { firstName, lastName, email, phoneNumber, supervisor } = req.body;
      await schema.validateAsync({ firstName, lastName, email, phoneNumber, supervisor});
  
      const result = {
        firstName,
        lastName,
        email,
        phoneNumber,
        supervisor
      }
      console.log("Create new Notification : ", result)
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

module.exports = router
