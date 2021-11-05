import React from "react"
import {Text,Image as ImageWidget, Spacer as SpacerWidget, 
    Heading as HeadingWidget, SingleColumnSection,TwoColumnSection,ThreeColumnSection,FourColumnSection, Divider as DividerWidget,
    Button as ButtonWidget} from '../widgets'
import { Element, useEditor } from "@craftjs/core";
import styled from "styled-components";



export const Paragraph = ()=>{
    const { connectors, query } = useEditor();

    return(
        <div ref={ref=> connectors.create(ref, <Text text="Dummy paragraph text" />)}>
        <svg 
            width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="140" height="100" rx="8" fill="#F5F5F5"/>
            <path d="M72.5 39H56.5V37H72.5V39ZM80.5 35H56.5V33H80.5V35ZM72.5 31H56.5V29H72.5V31ZM80.5 27H56.5V25H80.5V27Z" fill="#595959"/>
            <path d="M35.233 69H36.4659V65.2812H38.6932C41.0646 65.2812 42.1335 63.8395 42.1335 62.0398C42.1335 60.2401 41.0646 58.8182 38.6733 58.8182H35.233V69ZM36.4659 64.1875V59.9119H38.6335C40.2891 59.9119 40.9205 60.8168 40.9205 62.0398C40.9205 63.2628 40.2891 64.1875 38.6534 64.1875H36.4659ZM46.2077 69.179C47.5401 69.179 48.2362 68.4631 48.4748 67.9659H48.5344V69H49.7077V63.9688C49.7077 61.5426 47.8583 61.2642 46.8839 61.2642C45.7305 61.2642 44.418 61.6619 43.8214 63.054L44.935 63.4517C45.1935 62.8949 45.805 62.2983 46.9237 62.2983C48.0025 62.2983 48.5344 62.87 48.5344 63.8494V63.8892C48.5344 64.456 47.9577 64.4062 46.5657 64.5852C45.1488 64.7692 43.6026 65.0824 43.6026 66.8324C43.6026 68.3239 44.756 69.179 46.2077 69.179ZM46.3867 68.125C45.4521 68.125 44.7759 67.7074 44.7759 66.892C44.7759 65.9972 45.5913 65.7188 46.506 65.5994C47.0032 65.5398 48.3356 65.4006 48.5344 65.1619V66.2358C48.5344 67.1903 47.7788 68.125 46.3867 68.125ZM51.8493 69H53.0225V64.1676C53.0225 63.1335 53.8379 62.3778 54.9515 62.3778C55.2647 62.3778 55.5879 62.4375 55.6674 62.4574V61.2642C55.5332 61.2543 55.225 61.2443 55.051 61.2443C54.1362 61.2443 53.3407 61.7614 53.0623 62.517H52.9828V61.3636H51.8493V69ZM59.3054 69.179C60.6378 69.179 61.3338 68.4631 61.5724 67.9659H61.6321V69H62.8054V63.9688C62.8054 61.5426 60.956 61.2642 59.9815 61.2642C58.8281 61.2642 57.5156 61.6619 56.919 63.054L58.0327 63.4517C58.2912 62.8949 58.9027 62.2983 60.0213 62.2983C61.1001 62.2983 61.6321 62.87 61.6321 63.8494V63.8892C61.6321 64.456 61.0554 64.4062 59.6634 64.5852C58.2464 64.7692 56.7003 65.0824 56.7003 66.8324C56.7003 68.3239 57.8537 69.179 59.3054 69.179ZM59.4844 68.125C58.5497 68.125 57.8736 67.7074 57.8736 66.892C57.8736 65.9972 58.6889 65.7188 59.6037 65.5994C60.1009 65.5398 61.4332 65.4006 61.6321 65.1619V66.2358C61.6321 67.1903 60.8764 68.125 59.4844 68.125ZM68.0293 72.0227C69.8588 72.0227 71.3304 71.1875 71.3304 69.2188V61.3636H70.1969V62.5767H70.0776C69.8191 62.179 69.3418 61.2642 67.8503 61.2642C65.9213 61.2642 64.589 62.7955 64.589 65.142C64.589 67.5284 65.981 68.8807 67.8304 68.8807C69.3219 68.8807 69.7992 68.0057 70.0577 67.5881H70.1571V69.1392C70.1571 70.4119 69.2623 70.9886 68.0293 70.9886C66.6422 70.9886 66.155 70.2578 65.8418 69.8352L64.9071 70.4915C65.3844 71.2919 66.324 72.0227 68.0293 72.0227ZM67.9895 67.8267C66.5179 67.8267 65.7623 66.7131 65.7623 65.1222C65.7623 63.571 66.498 62.3182 67.9895 62.3182C69.4213 62.3182 70.177 63.4716 70.177 65.1222C70.177 66.8125 69.4015 67.8267 67.9895 67.8267ZM73.4782 69H74.6515V64.1676C74.6515 63.1335 75.4668 62.3778 76.5804 62.3778C76.8936 62.3778 77.2168 62.4375 77.2963 62.4574V61.2642C77.1621 61.2543 76.8539 61.2443 76.6799 61.2443C75.7651 61.2443 74.9696 61.7614 74.6912 62.517H74.6117V61.3636H73.4782V69ZM80.9343 69.179C82.2667 69.179 82.9627 68.4631 83.2013 67.9659H83.261V69H84.4343V63.9688C84.4343 61.5426 82.5849 61.2642 81.6104 61.2642C80.457 61.2642 79.1445 61.6619 78.5479 63.054L79.6616 63.4517C79.9201 62.8949 80.5316 62.2983 81.6502 62.2983C82.729 62.2983 83.261 62.87 83.261 63.8494V63.8892C83.261 64.456 82.6843 64.4062 81.2923 64.5852C79.8754 64.7692 78.3292 65.0824 78.3292 66.8324C78.3292 68.3239 79.4826 69.179 80.9343 69.179ZM81.1133 68.125C80.1786 68.125 79.5025 67.7074 79.5025 66.892C79.5025 65.9972 80.3178 65.7188 81.2326 65.5994C81.7298 65.5398 83.0621 65.4006 83.261 65.1619V66.2358C83.261 67.1903 82.5053 68.125 81.1133 68.125ZM86.5758 71.8636H87.7491V67.8267H87.8485C88.1071 68.2443 88.6042 69.1591 90.0758 69.1591C91.9849 69.1591 93.3173 67.6278 93.3173 65.2017C93.3173 62.7955 91.9849 61.2642 90.0559 61.2642C88.5645 61.2642 88.1071 62.179 87.8485 62.5767H87.7093V61.3636H86.5758V71.8636ZM87.7292 65.1818C87.7292 63.4716 88.4849 62.3182 89.9167 62.3182C91.4082 62.3182 92.144 63.571 92.144 65.1818C92.144 66.8125 91.3883 68.1051 89.9167 68.1051C88.5048 68.1051 87.7292 66.9119 87.7292 65.1818ZM96.2804 64.4062C96.2804 63.0739 97.1305 62.3182 98.2889 62.3182C99.3926 62.3182 100.059 63.0142 100.059 64.2273V69H101.232V64.1477C101.232 62.1839 100.188 61.2642 98.627 61.2642C97.4238 61.2642 96.7377 61.7663 96.3798 62.5568H96.2804V58.8182H95.1071V69H96.2804V64.4062Z" fill="#595959"/>
        </svg>
        </div>
    )
}

export const Heading = ()=>{
    const { connectors, query } = useEditor();

    return(
        <div ref={ref=> connectors.create(ref, <HeadingWidget text="Dummy heading text" />)}>
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="140" height="100" rx="8" fill="#F5F5F5"/>
        <path d="M57.333 25.334V29.334H63.9997V45.334H67.9997V29.334H74.6663V25.334H57.333ZM82.6663 32.0007H70.6663V36.0007H74.6663V45.334H78.6663V36.0007H82.6663V32.0007Z" fill="#595959"/>
        <path d="M43.233 77H44.4659V72.446H49.8949V77H51.1278V66.8182H49.8949V71.3523H44.4659V66.8182H43.233V77ZM56.6388 77.1591C58.19 77.1591 59.3235 76.3835 59.6815 75.2301L58.5479 74.9119C58.2496 75.7074 57.5586 76.1051 56.6388 76.1051C55.2617 76.1051 54.3121 75.2152 54.2575 73.5795H59.8008V73.0824C59.8008 70.2386 58.1104 69.2642 56.5195 69.2642C54.4513 69.2642 53.0792 70.8949 53.0792 73.2415C53.0792 75.5881 54.4315 77.1591 56.6388 77.1591ZM54.2575 72.5653C54.337 71.3771 55.1772 70.3182 56.5195 70.3182C57.7923 70.3182 58.6076 71.2727 58.6076 72.5653H54.2575ZM63.8327 77.179C65.1651 77.179 65.8612 76.4631 66.0998 75.9659H66.1594V77H67.3327V71.9688C67.3327 69.5426 65.4833 69.2642 64.5089 69.2642C63.3555 69.2642 62.043 69.6619 61.4464 71.054L62.56 71.4517C62.8185 70.8949 63.43 70.2983 64.5487 70.2983C65.6275 70.2983 66.1594 70.87 66.1594 71.8494V71.8892C66.1594 72.456 65.5827 72.4062 64.1907 72.5852C62.7738 72.7692 61.2276 73.0824 61.2276 74.8324C61.2276 76.3239 62.381 77.179 63.8327 77.179ZM64.0117 76.125C63.0771 76.125 62.4009 75.7074 62.4009 74.892C62.4009 73.9972 63.2163 73.7188 64.131 73.5994C64.6282 73.5398 65.9606 73.4006 66.1594 73.1619V74.2358C66.1594 75.1903 65.4038 76.125 64.0117 76.125ZM72.3578 77.1591C73.8294 77.1591 74.3265 76.2443 74.585 75.8267H74.7243V77H75.8578V66.8182H74.6845V70.5767H74.585C74.3265 70.179 73.8691 69.2642 72.3777 69.2642C70.4487 69.2642 69.1163 70.7955 69.1163 73.2017C69.1163 75.6278 70.4487 77.1591 72.3578 77.1591ZM72.5169 76.1051C71.0453 76.1051 70.2896 74.8125 70.2896 73.1818C70.2896 71.571 71.0254 70.3182 72.5169 70.3182C73.9487 70.3182 74.7044 71.4716 74.7044 73.1818C74.7044 74.9119 73.9288 76.1051 72.5169 76.1051ZM78.1696 77H79.3429V69.3636H78.1696V77ZM78.7662 68.0909C79.2235 68.0909 79.6014 67.733 79.6014 67.2955C79.6014 66.858 79.2235 66.5 78.7662 66.5C78.3088 66.5 77.9309 66.858 77.9309 67.2955C77.9309 67.733 78.3088 68.0909 78.7662 68.0909ZM82.6651 72.4062C82.6651 71.0739 83.4904 70.3182 84.614 70.3182C85.7028 70.3182 86.364 71.0291 86.364 72.2273V77H87.5373V72.1477C87.5373 70.1989 86.4982 69.2642 84.9521 69.2642C83.7987 69.2642 83.0827 69.7812 82.7248 70.5568H82.6254V69.3636H81.4918V77H82.6651V72.4062ZM92.7637 80.0227C94.5932 80.0227 96.0648 79.1875 96.0648 77.2188V69.3636H94.9313V70.5767H94.812C94.5534 70.179 94.0762 69.2642 92.5847 69.2642C90.6557 69.2642 89.3233 70.7955 89.3233 73.142C89.3233 75.5284 90.7154 76.8807 92.5648 76.8807C94.0563 76.8807 94.5336 76.0057 94.7921 75.5881H94.8915V77.1392C94.8915 78.4119 93.9966 78.9886 92.7637 78.9886C91.3766 78.9886 90.8894 78.2578 90.5762 77.8352L89.6415 78.4915C90.1188 79.2919 91.0584 80.0227 92.7637 80.0227ZM92.7239 75.8267C91.2523 75.8267 90.4966 74.7131 90.4966 73.1222C90.4966 71.571 91.2324 70.3182 92.7239 70.3182C94.1557 70.3182 94.9114 71.4716 94.9114 73.1222C94.9114 74.8125 94.1358 75.8267 92.7239 75.8267Z" fill="#595959"/>
        </svg>
        </div>
         
    )
}

export const Image = ()=>{
    const { connectors, query } = useEditor();
    return(
        <div ref={ref=> connectors.create(ref, <ImageWidget />)}>
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="139" height="99" rx="7.5" fill="#F5F5F5"/>
<path d="M79.8333 26.6667V45.3333H61.1667V26.6667H79.8333ZM79.8333 24H61.1667C59.7 24 58.5 25.2 58.5 26.6667V45.3333C58.5 46.8 59.7 48 61.1667 48H79.8333C81.3 48 82.5 46.8 82.5 45.3333V26.6667C82.5 25.2 81.3 24 79.8333 24ZM73.3533 35.8133L69.3533 40.9733L66.5 37.52L62.5 42.6667H78.5L73.3533 35.8133Z" fill="#595959"/>
<path d="M52.4659 66.8182H51.233V77H52.4659V66.8182ZM54.7789 77H55.9522V72.2273C55.9522 71.1087 56.7676 70.3182 57.6824 70.3182C58.5723 70.3182 59.1937 70.8999 59.1937 71.7699V77H60.3869V72.0284C60.3869 71.044 61.0034 70.3182 62.0772 70.3182C62.9125 70.3182 63.6284 70.7607 63.6284 71.8892V77H64.8017V71.8892C64.8017 70.0945 63.8372 69.2642 62.475 69.2642C61.3812 69.2642 60.5808 69.7663 60.188 70.5568H60.1085C59.7306 69.7415 59.0645 69.2642 58.0602 69.2642C57.0659 69.2642 56.3301 69.7415 56.0119 70.5568H55.9125V69.3636H54.7789V77ZM69.1941 77.179C70.5265 77.179 71.2225 76.4631 71.4611 75.9659H71.5208V77H72.6941V71.9688C72.6941 69.5426 70.8446 69.2642 69.8702 69.2642C68.7168 69.2642 67.4043 69.6619 66.8077 71.054L67.9213 71.4517C68.1799 70.8949 68.7914 70.2983 69.91 70.2983C70.9888 70.2983 71.5208 70.87 71.5208 71.8494V71.8892C71.5208 72.456 70.9441 72.4062 69.552 72.5852C68.1351 72.7692 66.589 73.0824 66.589 74.8324C66.589 76.3239 67.7424 77.179 69.1941 77.179ZM69.373 76.125C68.4384 76.125 67.7623 75.7074 67.7623 74.892C67.7623 73.9972 68.5776 73.7188 69.4924 73.5994C69.9895 73.5398 71.3219 73.4006 71.5208 73.1619V74.2358C71.5208 75.1903 70.7651 76.125 69.373 76.125ZM77.918 80.0227C79.7475 80.0227 81.2191 79.1875 81.2191 77.2188V69.3636H80.0856V70.5767H79.9663C79.7077 70.179 79.2305 69.2642 77.739 69.2642C75.81 69.2642 74.4776 70.7955 74.4776 73.142C74.4776 75.5284 75.8697 76.8807 77.7191 76.8807C79.2106 76.8807 79.6879 76.0057 79.9464 75.5881H80.0458V77.1392C80.0458 78.4119 79.1509 78.9886 77.918 78.9886C76.5309 78.9886 76.0437 78.2578 75.7305 77.8352L74.7958 78.4915C75.2731 79.2919 76.2127 80.0227 77.918 80.0227ZM77.8782 75.8267C76.4066 75.8267 75.6509 74.7131 75.6509 73.1222C75.6509 71.571 76.3867 70.3182 77.8782 70.3182C79.31 70.3182 80.0657 71.4716 80.0657 73.1222C80.0657 74.8125 79.2901 75.8267 77.8782 75.8267ZM86.5685 77.1591C88.1197 77.1591 89.2532 76.3835 89.6112 75.2301L88.4776 74.9119C88.1793 75.7074 87.4883 76.1051 86.5685 76.1051C85.1914 76.1051 84.2418 75.2152 84.1871 73.5795H89.7305V73.0824C89.7305 70.2386 88.0401 69.2642 86.4492 69.2642C84.381 69.2642 83.0089 70.8949 83.0089 73.2415C83.0089 75.5881 84.3612 77.1591 86.5685 77.1591ZM84.1871 72.5653C84.2667 71.3771 85.1069 70.3182 86.4492 70.3182C87.7219 70.3182 88.5373 71.2727 88.5373 72.5653H84.1871Z" fill="#595959"/>
<rect x="0.5" y="0.5" width="139" height="99" rx="7.5"/>
</svg>
</div>
    )

}

export const Video = ()=>{
    return(
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="140" height="100" rx="8" fill="#F5F5F5"/>
<path d="M59.3337 27.9993H56.667V46.666C56.667 48.1327 57.867 49.3327 59.3337 49.3327H78.0003V46.666H59.3337V27.9993ZM80.667 22.666H64.667C63.2003 22.666 62.0003 23.866 62.0003 25.3327V41.3327C62.0003 42.7993 63.2003 43.9993 64.667 43.9993H80.667C82.1337 43.9993 83.3337 42.7993 83.3337 41.3327V25.3327C83.3337 23.866 82.1337 22.666 80.667 22.666ZM80.667 41.3327H64.667V25.3327H80.667V41.3327ZM70.0003 27.3327V39.3327L78.0003 33.3327L70.0003 27.3327Z" fill="#595959"/>
<path d="M52.6506 66.8182H51.358L55.0966 77H56.3693L60.108 66.8182H58.8153L55.7926 75.3892H55.6733L52.6506 66.8182ZM61.5348 77H62.7081V69.3636H61.5348V77ZM62.1314 68.0909C62.5888 68.0909 62.9666 67.733 62.9666 67.2955C62.9666 66.858 62.5888 66.5 62.1314 66.5C61.674 66.5 61.2962 66.858 61.2962 67.2955C61.2962 67.733 61.674 68.0909 62.1314 68.0909ZM67.7406 77.1591C69.2122 77.1591 69.7093 76.2443 69.9679 75.8267H70.1071V77H71.2406V66.8182H70.0673V70.5767H69.9679C69.7093 70.179 69.252 69.2642 67.7605 69.2642C65.8315 69.2642 64.4991 70.7955 64.4991 73.2017C64.4991 75.6278 65.8315 77.1591 67.7406 77.1591ZM67.8997 76.1051C66.4281 76.1051 65.6724 74.8125 65.6724 73.1818C65.6724 71.571 66.4082 70.3182 67.8997 70.3182C69.3315 70.3182 70.0872 71.4716 70.0872 73.1818C70.0872 74.9119 69.3116 76.1051 67.8997 76.1051ZM76.7541 77.1591C78.3052 77.1591 79.4387 76.3835 79.7967 75.2301L78.6632 74.9119C78.3649 75.7074 77.6738 76.1051 76.7541 76.1051C75.377 76.1051 74.4274 75.2152 74.3727 73.5795H79.916V73.0824C79.916 70.2386 78.2257 69.2642 76.6348 69.2642C74.5666 69.2642 73.1944 70.8949 73.1944 73.2415C73.1944 75.5881 74.5467 77.1591 76.7541 77.1591ZM74.3727 72.5653C74.4522 71.3771 75.2924 70.3182 76.6348 70.3182C77.9075 70.3182 78.7228 71.2727 78.7228 72.5653H74.3727ZM84.8031 77.1591C86.8713 77.1591 88.2633 75.5881 88.2633 73.2216C88.2633 70.8352 86.8713 69.2642 84.8031 69.2642C82.7349 69.2642 81.3429 70.8352 81.3429 73.2216C81.3429 75.5881 82.7349 77.1591 84.8031 77.1591ZM84.8031 76.1051C83.2321 76.1051 82.5162 74.7528 82.5162 73.2216C82.5162 71.6903 83.2321 70.3182 84.8031 70.3182C86.3741 70.3182 87.09 71.6903 87.09 73.2216C87.09 74.7528 86.3741 76.1051 84.8031 76.1051Z" fill="#595959"/>
</svg>

    )
}

export const Spacer = ()=>{
    const { connectors, query } = useEditor();
    return(
        <div ref={ref=> connectors.create(ref, <SpacerWidget />)}>
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="140" height="100" rx="8" fill="#F5F5F5"/>
<path d="M65.167 26.666V31.9993H83.8337V26.666H81.167V29.3327H67.8337V26.666H65.167Z" fill="#595959"/>
<path d="M65.167 45.3333V40H83.8337V45.3333H81.167V42.6667H67.8337V45.3333H65.167Z" fill="#595959"/>
<path d="M67.834 34.666H81.1673V37.3327H67.834V34.666Z" fill="#595959"/>
<path d="M57.8011 69.3636H58.9943C58.9396 67.8274 57.5227 66.679 55.554 66.679C53.6051 66.679 52.0739 67.8125 52.0739 69.5227C52.0739 70.8949 53.0682 71.7102 54.6591 72.1676L55.9119 72.5256C56.9858 72.8239 57.9403 73.2017 57.9403 74.2159C57.9403 75.3295 56.8665 76.0653 55.4545 76.0653C54.2415 76.0653 53.1676 75.5284 53.0682 74.375H51.7955C51.9148 76.0455 53.267 77.179 55.4545 77.179C57.8011 77.179 59.1335 75.8864 59.1335 74.2358C59.1335 72.3267 57.3239 71.7102 56.2699 71.4318L55.2358 71.1534C54.4801 70.9545 53.267 70.5568 53.267 69.4631C53.267 68.4886 54.1619 67.7727 55.5142 67.7727C56.7472 67.7727 57.6818 68.3594 57.8011 69.3636ZM61.0016 79.8636H62.1749V75.8267H62.2743C62.5328 76.2443 63.03 77.1591 64.5016 77.1591C66.4107 77.1591 67.7431 75.6278 67.7431 73.2017C67.7431 70.7955 66.4107 69.2642 64.4817 69.2642C62.9902 69.2642 62.5328 70.179 62.2743 70.5767H62.1351V69.3636H61.0016V79.8636ZM62.155 73.1818C62.155 71.4716 62.9107 70.3182 64.3425 70.3182C65.834 70.3182 66.5698 71.571 66.5698 73.1818C66.5698 74.8125 65.8141 76.1051 64.3425 76.1051C62.9306 76.1051 62.155 74.9119 62.155 73.1818ZM71.78 77.179C73.1124 77.179 73.8084 76.4631 74.0471 75.9659H74.1067V77H75.28V71.9688C75.28 69.5426 73.4306 69.2642 72.4561 69.2642C71.3027 69.2642 69.9902 69.6619 69.3936 71.054L70.5073 71.4517C70.7658 70.8949 71.3773 70.2983 72.4959 70.2983C73.5748 70.2983 74.1067 70.87 74.1067 71.8494V71.8892C74.1067 72.456 73.53 72.4062 72.138 72.5852C70.7211 72.7692 69.1749 73.0824 69.1749 74.8324C69.1749 76.3239 70.3283 77.179 71.78 77.179ZM71.959 76.125C71.0243 76.125 70.3482 75.7074 70.3482 74.892C70.3482 73.9972 71.1635 73.7188 72.0783 73.5994C72.5755 73.5398 73.9078 73.4006 74.1067 73.1619V74.2358C74.1067 75.1903 73.351 76.125 71.959 76.125ZM80.5238 77.1591C82.2141 77.1591 83.3278 76.125 83.5266 74.7727H82.3533C82.1346 75.608 81.4386 76.1051 80.5238 76.1051C79.1317 76.1051 78.2369 74.9517 78.2369 73.1818C78.2369 71.4517 79.1516 70.3182 80.5238 70.3182C81.5579 70.3182 82.1744 70.9545 82.3533 71.6506H83.5266C83.3278 70.2188 82.1147 69.2642 80.5039 69.2642C78.4357 69.2642 77.0636 70.8949 77.0636 73.2216C77.0636 75.5085 78.3761 77.1591 80.5238 77.1591ZM88.4435 77.1591C89.9947 77.1591 91.1282 76.3835 91.4862 75.2301L90.3526 74.9119C90.0543 75.7074 89.3633 76.1051 88.4435 76.1051C87.0664 76.1051 86.1168 75.2152 86.0621 73.5795H91.6055V73.0824C91.6055 70.2386 89.9151 69.2642 88.3242 69.2642C86.256 69.2642 84.8839 70.8949 84.8839 73.2415C84.8839 75.5881 86.2362 77.1591 88.4435 77.1591ZM86.0621 72.5653C86.1417 71.3771 86.9819 70.3182 88.3242 70.3182C89.5969 70.3182 90.4123 71.2727 90.4123 72.5653H86.0621ZM93.3903 77H94.5636V72.1676C94.5636 71.1335 95.3789 70.3778 96.4925 70.3778C96.8058 70.3778 97.1289 70.4375 97.2085 70.4574V69.2642C97.0742 69.2543 96.766 69.2443 96.592 69.2443C95.6772 69.2443 94.8817 69.7614 94.6033 70.517H94.5238V69.3636H93.3903V77Z" fill="#595959"/>
</svg>
</div>
    )
}

export const Divider = ()=>{
    const { connectors, query } = useEditor();
    return(
        <div ref={ref=> connectors.create(ref, <DividerWidget />)}>
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="140" height="100" rx="8" fill="#F5F5F5"/>
<path d="M60 24.5938V47.4062H89V24.5938H60ZM61.5 26.0118H87.4375V35.2188H87.0312V36.7812H87.4375V45.8797H61.5V36.7812H62.0625V35.2188H61.5V26.0118ZM63.625 35.2188V36.7812H66.75V35.2188H63.625ZM68.3125 35.2188V36.7812H71.4375V35.2188H68.3125ZM73 35.2188V36.7812H76.125V35.2188H73ZM77.6875 35.2188V36.7812H80.8125V35.2188H77.6875ZM82.375 35.2188V36.7812H85.5V35.2188H82.375Z" fill="#595959"/>
<path d="M55.375 77C58.4773 77 60.2273 75.071 60.2273 71.8892C60.2273 68.7273 58.4773 66.8182 55.5142 66.8182H52.233V77H55.375ZM53.4659 75.9062V67.9119H55.4347C57.821 67.9119 59.0341 69.4233 59.0341 71.8892C59.0341 74.375 57.821 75.9062 55.2955 75.9062H53.4659ZM62.1364 77H63.3097V69.3636H62.1364V77ZM62.733 68.0909C63.1903 68.0909 63.5682 67.733 63.5682 67.2955C63.5682 66.858 63.1903 66.5 62.733 66.5C62.2756 66.5 61.8977 66.858 61.8977 67.2955C61.8977 67.733 62.2756 68.0909 62.733 68.0909ZM71.7029 69.3636H70.4302L68.3223 75.4489H68.2427L66.1348 69.3636H64.862L67.6859 77H68.8791L71.7029 69.3636ZM73.2516 77H74.4249V69.3636H73.2516V77ZM73.8482 68.0909C74.3056 68.0909 74.6834 67.733 74.6834 67.2955C74.6834 66.858 74.3056 66.5 73.8482 66.5C73.3908 66.5 73.013 66.858 73.013 67.2955C73.013 67.733 73.3908 68.0909 73.8482 68.0909ZM79.4574 77.1591C80.929 77.1591 81.4261 76.2443 81.6847 75.8267H81.8239V77H82.9574V66.8182H81.7841V70.5767H81.6847C81.4261 70.179 80.9688 69.2642 79.4773 69.2642C77.5483 69.2642 76.2159 70.7955 76.2159 73.2017C76.2159 75.6278 77.5483 77.1591 79.4574 77.1591ZM79.6165 76.1051C78.1449 76.1051 77.3892 74.8125 77.3892 73.1818C77.3892 71.571 78.125 70.3182 79.6165 70.3182C81.0483 70.3182 81.804 71.4716 81.804 73.1818C81.804 74.9119 81.0284 76.1051 79.6165 76.1051ZM88.4709 77.1591C90.022 77.1591 91.1555 76.3835 91.5135 75.2301L90.38 74.9119C90.0817 75.7074 89.3906 76.1051 88.4709 76.1051C87.0938 76.1051 86.1442 75.2152 86.0895 73.5795H91.6328V73.0824C91.6328 70.2386 89.9425 69.2642 88.3516 69.2642C86.2834 69.2642 84.9112 70.8949 84.9112 73.2415C84.9112 75.5881 86.2635 77.1591 88.4709 77.1591ZM86.0895 72.5653C86.169 71.3771 87.0092 70.3182 88.3516 70.3182C89.6243 70.3182 90.4396 71.2727 90.4396 72.5653H86.0895ZM93.4176 77H94.5909V72.1676C94.5909 71.1335 95.4062 70.3778 96.5199 70.3778C96.8331 70.3778 97.1562 70.4375 97.2358 70.4574V69.2642C97.1016 69.2543 96.7933 69.2443 96.6193 69.2443C95.7045 69.2443 94.9091 69.7614 94.6307 70.517H94.5511V69.3636H93.4176V77Z" fill="#595959"/>
</svg>
</div>
    )
}

export const Countdown = ()=>{
    return(
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="140" height="100" rx="8" fill="#F5F5F5"/>
<g clip-path="url(#clip0)">
<path d="M64.75 44.875C64.75 44.4028 64.9167 43.9861 65.25 43.625C65.5833 43.2639 66 43.0833 66.5 43.0833C67 43.0833 67.4167 43.2639 67.75 43.625C68.0833 43.9861 68.25 44.4028 68.25 44.875C68.25 45.3472 68.0833 45.7639 67.75 46.125C67.4167 46.4861 67 46.6667 66.5 46.6667C66 46.6667 65.5833 46.4861 65.25 46.125C64.9167 45.7639 64.75 45.3472 64.75 44.875ZM64.75 20H66.5C70.9444 20 74.7222 21.5556 77.8333 24.6667C80.9444 27.7778 82.5 31.5556 82.5 36C82.5 40.4444 80.9444 44.2222 77.8333 47.3333C74.7222 50.4444 70.9444 52 66.5 52C62.0556 52 58.2778 50.4444 55.1667 47.3333C52.0556 44.2222 50.5 40.4444 50.5 36C50.5 33.4444 51.0694 31.0417 52.2083 28.7917C53.3472 26.5417 54.9167 24.6944 56.9167 23.25V23.1667L69 35.25L66.5 37.75L56.8333 28.1667C55 30.4444 54.0833 33.0556 54.0833 36C54.0833 39.4444 55.2917 42.375 57.7083 44.7917C60.125 47.2083 63.0556 48.4167 66.5 48.4167C69.9444 48.4167 72.875 47.2083 75.2917 44.7917C77.7083 42.375 78.9167 39.4444 78.9167 36C78.9167 32.8889 77.9028 30.1667 75.875 27.8333C73.8472 25.5 71.3056 24.1111 68.25 23.6667V27.0833H64.75V20ZM77.1667 36C77.1667 36.5 76.9861 36.9167 76.625 37.25C76.2639 37.5833 75.8472 37.75 75.375 37.75C74.9028 37.75 74.4861 37.5833 74.125 37.25C73.7639 36.9167 73.5833 36.5 73.5833 36C73.5833 35.5 73.7639 35.0833 74.125 34.75C74.4861 34.4167 74.9028 34.25 75.375 34.25C75.8472 34.25 76.2639 34.4167 76.625 34.75C76.9861 35.0833 77.1667 35.5 77.1667 36ZM55.8333 36C55.8333 35.5 56.0139 35.0833 56.375 34.75C56.7361 34.4167 57.1528 34.25 57.625 34.25C58.0972 34.25 58.5139 34.4167 58.875 34.75C59.2361 35.0833 59.4167 35.5 59.4167 36C59.4167 36.5 59.2361 36.9167 58.875 37.25C58.5139 37.5833 58.0972 37.75 57.625 37.75C57.1528 37.75 56.7361 37.5833 56.375 37.25C56.0139 36.9167 55.8333 36.5 55.8333 36Z" fill="#595959"/>
</g>
<path d="M37.4261 70C37.0483 67.9119 35.3778 66.679 33.3295 66.679C30.7244 66.679 28.8352 68.6875 28.8352 71.9091C28.8352 75.1307 30.7244 77.1392 33.3295 77.1392C35.3778 77.1392 37.0483 75.9062 37.4261 73.8182H36.1932C35.8949 75.2301 34.6818 75.9858 33.3295 75.9858C31.4801 75.9858 30.0284 74.554 30.0284 71.9091C30.0284 69.2642 31.4801 67.8324 33.3295 67.8324C34.6818 67.8324 35.8949 68.5881 36.1932 70H37.4261ZM42.3617 77.1591C44.4299 77.1591 45.8219 75.5881 45.8219 73.2216C45.8219 70.8352 44.4299 69.2642 42.3617 69.2642C40.2935 69.2642 38.9015 70.8352 38.9015 73.2216C38.9015 75.5881 40.2935 77.1591 42.3617 77.1591ZM42.3617 76.1051C40.7907 76.1051 40.0748 74.7528 40.0748 73.2216C40.0748 71.6903 40.7907 70.3182 42.3617 70.3182C43.9327 70.3182 44.6486 71.6903 44.6486 73.2216C44.6486 74.7528 43.9327 76.1051 42.3617 76.1051ZM52.4254 73.8778C52.4254 75.3097 51.3317 75.9659 50.4567 75.9659C49.4822 75.9659 48.7862 75.25 48.7862 74.1364V69.3636H47.6129V74.2159C47.6129 76.1648 48.647 77.0994 50.0788 77.0994C51.2322 77.0994 51.9879 76.483 52.3459 75.7074H52.4254V77H53.5987V69.3636H52.4254V73.8778ZM56.921 72.4062C56.921 71.0739 57.7463 70.3182 58.8699 70.3182C59.9586 70.3182 60.6199 71.0291 60.6199 72.2273V77H61.7931V72.1477C61.7931 70.1989 60.7541 69.2642 59.2079 69.2642C58.0545 69.2642 57.3386 69.7812 56.9806 70.5568H56.8812V69.3636H55.7477V77H56.921V72.4062ZM67.2582 69.3636H65.6275V67.5341H64.4542V69.3636H63.3008V70.358H64.4542V75.1307C64.4542 76.4631 65.5281 77.0994 66.5224 77.0994C66.9599 77.0994 67.2383 77.0199 67.3974 76.9602L67.1587 75.9062C67.0593 75.9261 66.9002 75.9659 66.6417 75.9659C66.1246 75.9659 65.6275 75.8068 65.6275 74.8125V70.358H67.2582V69.3636ZM71.8246 77.1591C73.2962 77.1591 73.7933 76.2443 74.0518 75.8267H74.1911V77H75.3246V66.8182H74.1513V70.5767H74.0518C73.7933 70.179 73.3359 69.2642 71.8445 69.2642C69.9155 69.2642 68.5831 70.7955 68.5831 73.2017C68.5831 75.6278 69.9155 77.1591 71.8246 77.1591ZM71.9837 76.1051C70.5121 76.1051 69.7564 74.8125 69.7564 73.1818C69.7564 71.571 70.4922 70.3182 71.9837 70.3182C73.4155 70.3182 74.1712 71.4716 74.1712 73.1818C74.1712 74.9119 73.3956 76.1051 71.9837 76.1051ZM80.7386 77.1591C82.8068 77.1591 84.1989 75.5881 84.1989 73.2216C84.1989 70.8352 82.8068 69.2642 80.7386 69.2642C78.6705 69.2642 77.2784 70.8352 77.2784 73.2216C77.2784 75.5881 78.6705 77.1591 80.7386 77.1591ZM80.7386 76.1051C79.1676 76.1051 78.4517 74.7528 78.4517 73.2216C78.4517 71.6903 79.1676 70.3182 80.7386 70.3182C82.3097 70.3182 83.0256 71.6903 83.0256 73.2216C83.0256 74.7528 82.3097 76.1051 80.7386 76.1051ZM87.4602 77H88.6136L90.2841 71.1335H90.4034L92.0739 77H93.2273L95.554 69.3636H94.321L92.6705 75.1903H92.5909L90.9801 69.3636H89.7273L88.0966 75.2102H88.017L86.3665 69.3636H85.1335L87.4602 77ZM98.2784 72.4062C98.2784 71.0739 99.1037 70.3182 100.227 70.3182C101.316 70.3182 101.977 71.0291 101.977 72.2273V77H103.151V72.1477C103.151 70.1989 102.112 69.2642 100.565 69.2642C99.4119 69.2642 98.696 69.7812 98.3381 70.5568H98.2386V69.3636H97.1051V77H98.2784V72.4062Z" fill="#595959"/>
<defs>
<clipPath id="clip0">
<rect width="32" height="32" fill="white" transform="translate(50.5 20)"/>
</clipPath>
</defs>
</svg>

    )
}

export const Button = ()=>{
    const { connectors, query } = useEditor();
    return(
        <div ref={ref=> connectors.create(ref, <ButtonWidget />)}>
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="140" height="100" rx="8" fill="#F5F5F5"/>
<path d="M82.5 31.25V38.75C82.5 40.125 81.375 41.25 80 41.25H78.75V38.75H80V31.25H60V38.75H67.5V41.25H60C58.625 41.25 57.5 40.125 57.5 38.75V31.25C57.5 29.875 58.625 28.75 60 28.75H80C81.375 28.75 82.5 29.875 82.5 31.25ZM73.125 43.75L74.4875 40.7375L77.5 39.375L74.4875 38.0125L73.125 35L71.7625 38.0125L68.75 39.375L71.7625 40.7375L73.125 43.75ZM76.25 37.5L77.025 35.775L78.75 35L77.025 34.225L76.25 32.5L75.475 34.225L73.75 35L75.475 35.775L76.25 37.5ZM73.125 43.75L74.4875 40.7375L77.5 39.375L74.4875 38.0125L73.125 35L71.7625 38.0125L68.75 39.375L71.7625 40.7375L73.125 43.75ZM76.25 37.5L77.025 35.775L78.75 35L77.025 34.225L76.25 32.5L75.475 34.225L73.75 35L75.475 35.775L76.25 37.5Z" fill="#595959"/>
<path d="M49.233 75H52.9119C55.3182 75 56.3125 73.8267 56.3125 72.2955C56.3125 70.6847 55.1989 69.8097 54.2642 69.75V69.6506C55.1392 69.4119 55.9148 68.8352 55.9148 67.5227C55.9148 66.0312 54.9205 64.8182 52.7926 64.8182H49.233V75ZM50.4659 73.9062V70.3665H52.9716C54.304 70.3665 55.1392 71.2614 55.1392 72.2955C55.1392 73.1903 54.5227 73.9062 52.9119 73.9062H50.4659ZM50.4659 69.2926V65.9119H52.7926C54.1449 65.9119 54.7415 66.6278 54.7415 67.5227C54.7415 68.5966 53.8665 69.2926 52.7528 69.2926H50.4659ZM62.9918 71.8778C62.9918 73.3097 61.8981 73.9659 61.0231 73.9659C60.0487 73.9659 59.3526 73.25 59.3526 72.1364V67.3636H58.1793V72.2159C58.1793 74.1648 59.2134 75.0994 60.6452 75.0994C61.7987 75.0994 62.5543 74.483 62.9123 73.7074H62.9918V75H64.1651V67.3636H62.9918V71.8778ZM69.6351 67.3636H68.0044V65.5341H66.8311V67.3636H65.6777V68.358H66.8311V73.1307C66.8311 74.4631 67.905 75.0994 68.8993 75.0994C69.3368 75.0994 69.6152 75.0199 69.7743 74.9602L69.5357 73.9062C69.4363 73.9261 69.2772 73.9659 69.0186 73.9659C68.5016 73.9659 68.0044 73.8068 68.0044 72.8125V68.358H69.6351V67.3636ZM74.7211 67.3636H73.0904V65.5341H71.9171V67.3636H70.7637V68.358H71.9171V73.1307C71.9171 74.4631 72.9909 75.0994 73.9853 75.0994C74.4228 75.0994 74.7012 75.0199 74.8603 74.9602L74.6216 73.9062C74.5222 73.9261 74.3631 73.9659 74.1046 73.9659C73.5875 73.9659 73.0904 73.8068 73.0904 72.8125V68.358H74.7211V67.3636ZM79.5062 75.1591C81.5744 75.1591 82.9664 73.5881 82.9664 71.2216C82.9664 68.8352 81.5744 67.2642 79.5062 67.2642C77.438 67.2642 76.046 68.8352 76.046 71.2216C76.046 73.5881 77.438 75.1591 79.5062 75.1591ZM79.5062 74.1051C77.9352 74.1051 77.2193 72.7528 77.2193 71.2216C77.2193 69.6903 77.9352 68.3182 79.5062 68.3182C81.0772 68.3182 81.7931 69.6903 81.7931 71.2216C81.7931 72.7528 81.0772 74.1051 79.5062 74.1051ZM85.9308 70.4062C85.9308 69.0739 86.756 68.3182 87.8796 68.3182C88.9684 68.3182 89.6296 69.0291 89.6296 70.2273V75H90.8029V70.1477C90.8029 68.1989 89.7638 67.2642 88.2177 67.2642C87.0643 67.2642 86.3484 67.7812 85.9904 68.5568H85.891V67.3636H84.7575V75H85.9308V70.4062Z" fill="#595959"/>
</svg>
</div>
    )
}

const Row = styled.div`
    height: 112px;
    border:1px solid #D9D9D9;
    border-radius:8px;
    display:flex;
    padding:16px;
    gap:10px;
    margin-top:20px;
`

const Col = styled.div`
    background: #E6F7FF;
    height:80px;
    border: 1px solid #40A9FF;
    flex:1;
`

export const SingleColumn = ()=>{
    const { connectors, query } = useEditor();
    return(
        <div ref={ref=> connectors.create(ref, <SingleColumnSection />)}>
            <Row>
                <Col />
            </Row>
        </div>
    )
}

export const DoubleColumn = ()=>{
    const { connectors, query } = useEditor();
    return(
        <div ref={ref=> connectors.create(ref, <TwoColumnSection />)}>
            <Row>
                <Col />
                <Col />
            </Row>
        </div>
    )
}



export const ThreeColumn = ()=>{
    const { connectors, query } = useEditor();
    return(
        <div ref={ref=> connectors.create(ref, <ThreeColumnSection />)}>
            <Row>
                <Col />
                <Col />
                <Col />
            </Row>
        </div>
    )
}

export const FourColumn = ()=>{
    const { connectors, query } = useEditor();
    return(
        <div ref={ref=> connectors.create(ref, <FourColumnSection />)}>
            <Row>
                <Col />
                <Col />
                <Col />
                <Col />
            </Row>
        </div>
    )
}
