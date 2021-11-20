import Row from './row/Row'
import Section from './section/Section'
import Column from './col/Col'



const SingleColumn = ()=>{
    return(
        <Section><Row><Column/></Row></Section>
    )
}

const DoubleColumn = ()=>{
    return(
        <Section>
            <Row>
                <Column/>
                <Column/>
            </Row>
        </Section>
    )
}

const TrippleColumn = ()=>{
    return(
        <Section>
            <Row>
                <Column/>
                <Column/>
                <Column/>
            </Row>
        </Section>
    )
}
const QuadrupleColumn = ()=>{
    return(
        <Section>
            <Row>
                <Column/>
                <Column/>
                <Column/>
                <Column/>
            </Row>
        </Section>
    )
}







export{
    Row,
    Section,
    Column,
    SingleColumn,
    DoubleColumn,
    TrippleColumn,
    QuadrupleColumn
}