import axios from 'axios'

const ResolveAccount = async(account_number,account_bank)=>{
    const {data} = await axios.post('https://api.flutterwave.com/v3/accounts/resolve',{
        account_number,
        account_bank
    },{
        headers: { Authorization: `Bearer FLWPUBK_TEST-3f92e2c7e96647a15cfd7206f88dcd60-X` }
    })

    return data
}

export default ResolveAccount
