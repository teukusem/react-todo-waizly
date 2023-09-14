import styled from "styled-components";

const StyledCard = styled.div`
    background-color: ${props => props.color ?? '#fff'};
    height: 200px;
    padding: 1rem;
    border-radius: 1rem;
    margin-bottom:1rem;
    text-decoration: ${props => props.done ? 'line-through' : ''};
`
export {
    StyledCard
}