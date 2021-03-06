import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import oc from "open-color";
import { firebaseConnect, pathToJS } from "react-redux-firebase";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const propTypes = {
    onShowModal: PropTypes.func,
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired
    })
};

const defaultTypes = {
    onShowModal() {},
};

const Wrapper = styled.div`
    text-align: right;
    padding-right: 70px;
`;

const Button = styled.button`
    background: palevioletred;
    color: white;
    
    font-size: 1em;
    margin: 1em 0em 1em 8em;
    padding: 0.25em 1em;
    
    border: 2px solid palevioletred;
    border-radius: 3px;
    
    transition: all 0.3s ease;
    
    &:hover {
        background: ${oc.pink[4]};
        border: 2px solid ${oc.pink[4]};
    }
`;

const MenuItem = styled.button`
    background: white;
    font-weight: 500;
    font-size: 0.9em;
    border: 2px solid white;
    
    margin: 15px 0 15px 20px;
    
    &:hover {
        color: ${oc.gray[5]};
    }
`;

const MenuAbout = styled.button`
    background: white;
    font-weight: 500;
    font-size: 0.9em;
    border: 2px solid white;
    
    margin: 15px 0 15px 20px;
    
    &:hover {
        color: ${oc.gray[5]};
    }
    
    text-align: left;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    
    &:hover {
        color: ${oc.gray[5]};
    }
`;

export class Header extends React.Component {
    handleLogOut () {
        this.props.firebase.logout();
    }

    render () {
        const { onShowModal, profile } = this.props;
    
        return (
            <div>
                <Wrapper>
                    {profile&&
                        <div>
                            <MenuAbout>
                                <StyledLink to="About">
                                    About
                                </StyledLink>
                            </MenuAbout>
                            <MenuItem
                                onClick={() => this.handleLogOut()}>
                                로그 아웃
                            </MenuItem>
                            <Button
                                onClick={() => onShowModal({ modalType: "MODAL_REGISTER" })}>
                                등록하기
                            </Button>
                        </div>
                    }
                    {!profile&&
                        <span>
                            <MenuAbout>
                                About
                            </MenuAbout>
                            <MenuItem
                                onClick={() => onShowModal({modalType: "MODAL_SIGNUP"})}>
                                회원가입
                            </MenuItem>
                            <MenuItem
                                onClick={() => onShowModal({modalType: "MODAL_SIGNIN"})}>
                                로그인
                            </MenuItem>
                        </span>
                    }
                </Wrapper>
            </div>
        )
    }
}

Header.propTypes = propTypes;
Header.defaultTypes = defaultTypes;

const WrappedHeader = firebaseConnect()(Header);

export default connect(
    ({ firebase}) => ({
        profile: pathToJS(firebase, "profile")
    })
)(WrappedHeader);

