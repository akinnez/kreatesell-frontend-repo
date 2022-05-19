import {questions as AffiliateFaq} from "./Affiliate";
import {questions as BuyerFaq} from "./Buyer";
import {questions as GeneralFaq} from "./General";
import {questions as KreatorAffiliateFaq} from "./KreatorAffiliate";
import {questions as KreatorFaq} from "./Kreators";

export default function handler(req, res){
    let questions = {
        Affiliate: AffiliateFaq,
        Buyer: BuyerFaq,
        General: GeneralFaq,
        KreatorAffiliate: KreatorAffiliateFaq,
        Kreator: KreatorFaq
    }
    res.status(200).json({items: questions});
}