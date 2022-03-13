exports.getUtilitiesOfOneUser = catchAsync(async (req, res, next) => {

    const Data = await UserUtilitiesModel.aggregate([
        {
            $match: {
                User: ObjectId(req.body.User)
            }
        },
    ])
    const Utilities = await UtilitiesModel.find()
    let active = [];
    let Pending = [];
    let inaactive = [];

    Utilities.map((utilityMap) => {
        const index = Data.findIndex(DataMap => DataMap.Utilities.Title === utilityMap.Title)

        if (index > -1) {
            let missing = []
            if (!Data[index].IsPaid) { missing.push('IsPaid') }
            if (!Data[index].ContractExpiryDate) { missing.push('ContractExpiryDate') }
            if (!Data[index].LastBill) { missing.push('LastBill') }
            if (!Data[index].LOAForm) { missing.push('LOAForm') }

            let date = new Date(Data[index].ContractExpiryDate || '')
            var newdate = new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 2,
                new Date().getDate()
            );
            console.log(newdate.toISOString() > date.toISOString())
            console.log(newdate.toISOString(), date.toISOString())

            if (missing.length > 0) {
                Data[index].isActive = 'fillform'
            }
            else{
                if (newdate.toISOString() < date.toISOString()) {
                    console.log('expiry hit')
                    Data[index].isActive = 'Expired'
                } else {


                    Data[index].isActive = 'activated'

                }
            }

            if (missing.length)
                console.log(Data[index])
            active.push({ Utilities: utilityMap, UserUtility: Data[index], Missing: missing })
        } else {
            utilityMap.isActive = 'inactive'
            inaactive.push({ Utilities: utilityMap });
        }

    })

    if (active[0]) {

        return res.status(200).json({
            success: true, message: "Utility Found for this User", active, inaactive, UserUtilities: Data || [], AllUtilties: Utilities || []
        })

    } else {
        inaactive = Utilities;
        return res.status(200).json({
            success: true, message: "Utility Found for this User", active, inaactive, UserUtilities: Data || [], AllUtilties: Utilities || []
        })

    }

    return next(new Error('No Utility Found for this User'))


})


//////previos
exports.getUtilitiesOfOneUser = catchAsync(async (req, res, next) => {

    const Data = await UserUtilitiesModel.aggregate([
        {
            $match: {
                User: ObjectId(req.body.User)
            }
        },
    ])
    const Utilities = await UtilitiesModel.find()
    let active = [];
    let Pending = [];
    let inaactive = [];

    Utilities.map((utilityMap) => {
        const index = Data.findIndex(DataMap => DataMap.Utilities.Title === utilityMap.Title)

        if (index > -1) {
            let missing = []
            if (!Data[index].IsPaid) { missing.push('IsPaid') }
            if (!Data[index].ContractExpiryDate) { missing.push('ContractExpiryDate') }
            if (!Data[index].LastBill) { missing.push('LastBill') }
            if (!Data[index].LOAForm) { missing.push('LOAForm') }

            let date = new Date(Data[index].ContractExpiryDate || '')
            var newdate = new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 2,
                new Date().getDate()
            );
            console.log(newdate.toISOString() > date.toISOString())
            console.log(newdate.toISOString(), date.toISOString())
            if (newdate.toISOString() < date.toISOString()) {
                console.log('expiry hit')
                Data[index].isActive = 'Expired'
            } else {
                if (missing.length > 0) {
                    Data[index].isActive = 'fillform'
                }
                else {
                    Data[index].isActive = 'activated'
                }
            }

            if (missing.length)
                console.log(Data[index])
            active.push({ Utilities: utilityMap, UserUtility: Data[index], Missing: missing })
        } else {
            utilityMap.isActive = 'inactive'
            inaactive.push({ Utilities: utilityMap });
        }

    })

    if (active[0]) {

        return res.status(200).json({
            success: true, message: "Utility Found for this User", active, inaactive, UserUtilities: Data || [], AllUtilties: Utilities || []
        })

    } else {
        inaactive = Utilities;
        return res.status(200).json({
            success: true, message: "Utility Found for this User", active, inaactive, UserUtilities: Data || [], AllUtilties: Utilities || []
        })

    }

    return next(new Error('No Utility Found for this User'))


})