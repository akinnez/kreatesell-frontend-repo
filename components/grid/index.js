import React from 'react'


export const Row = ({children,...rest})=>{

    return(
        <>
         <div className="row" {...rest}>
               {children}
            </div>

            <style jsx>{`

                .row::after {
                    content: "";
                    clear: both;
                    display: table;
                    margin:0;
                }

              
            
            `}</style>
        </>
    )
}

export const Column = ({m="12", s="12",align, children,...rest})=>{

    return(
        <>
         <div className={`col m${m} s${s} ${align}`} {...rest}>
            {children}
        </div>

        <style jsx>{`
                .center {
                    text-align: center;
                }

            .right {
                display: flex;
                justify-content: flex-end;
            }

            .justify {
                display: flex;
                justify-content: space-between;
            }
            .m1 {width: 8.33%;}
            .m2 {width: 16.66%;}
            .m3 {width: 25%;}
            .m4 {width: 33.33%;}
            .m5 {width: 41.66%;}
            .m6 {width: 50%;}
            .m7 {width: 58.33%;}
            .m8 {width: 66.66%;}
            .m9 {width: 75%;}
            .m10 {width: 83.33%;}
            .m11 {width: 91.66%;}
            .m12 {width: 100%;}

            .col{
                float: left;
                padding: 8px;
              }

              @media only screen and (max-width: 768px) {
                /* For mobile phones: */
                .col{
                  width: 100%;
                }
              }

              @media only screen and (max-width: 600px) {
                /* For tablets: */
                .s1 {width: 8.33%;}
                .s2 {width: 16.66%;}
                .s3 {width: 25%;}
                .s4 {width: 33.33%;}
                .s5 {width: 41.66%;}
                .s6 {width: 50%;}
                .s7 {width: 58.33%;}
                .s8 {width: 66.66%;}
                .s9 {width: 75%;}
                .s10 {width: 83.33%;}
                .s11 {width: 91.66%;}
                .s12 {width: 100%;}
              }
        `}</style>
        </>
    )
}

export const Divider = ({...rest})=>{

    return(
        <>
        <div {...rest} className="divider"/>
        <style jsx>{`
        .divider {
            height: 1px;
            background: #d9d9d9;
            margin: 20px 0;
        }
        `}</style>
        </>
    )
}