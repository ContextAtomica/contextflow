import styled from "styled-components";
import { Link } from "react-router-dom";

export const CustomNavLinkSmall = styled(Link)`
  font-size: 1.2rem;
  color: #fff;
  transition: color 0.2s ease-in;
  margin: 0.5rem 1rem;
  text-decoration: none;
  text-transform: uppercase;
  @media only screen and (max-width: 768px) {
    margin: 1.25rem 2rem;
  }
`;

export const StyledButton = styled("button")`
  background: ${(p) => p.color || "#2e186a"};
  color: ${(p) => (p.color ? "#2E186A" : "#fff")};
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 1px solid #edf3f5;
  border-radius: 4px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  max-width: 180px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);
  &:hover,
  &:active,
  &:focus {
    color: #fff;
    border: 1px solid rgb(255, 130, 92);
    background-color: rgb(255, 130, 92);
  }
`;
