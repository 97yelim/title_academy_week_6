import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { __createComment, __getComments } from '../../redux/modules/comment';

const MemeCommentForm = ({setState}) => {
    const { postId } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch()

    const black_pattern = /^\s+|\s+$/g;
    const isBlank = (value) => (
        value.replace(black_pattern, '') === "" ? false : true
    )

    const onSubmit = (data) => {
        const new_comment = {
            postId: parseInt(postId),
            content: data.comment
        }

        dispatch(__createComment(new_comment));
        setState(new_comment)      
        reset({ comment: " " })
    }
    
    const onError = (errors, e) => console.log(errors, e);

    return (
        <StMemeCommentForm onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
                <StLabel>댓글</StLabel>
                <StInput 
                    type="text"
                    placeholder='30자 이내'
                    {...register("comment", { required: true, maxLength: 30, validate:
                        value => isBlank(value)
                    })}
                />
                    {errors.comment && errors.comment.type === "required" && <p>댓글 내용을 입력해 주세요~</p>}
                    {errors.comment && errors.comment.type === "maxLength" && <p>댓글 내용이 너무 길어요 ㅜㅜ</p>}
                    {errors.comment && errors.comment.type === "validate" && <p>공백만 입력되었어요!</p>}
            </div>
            <StButton>입력하기</StButton>
        </StMemeCommentForm>
    );
};

const StMemeCommentForm = styled.form`
    display: flex;
    justify-content: space-between;
    padding: 30px 10px;
    align-items: flex-end;
    border-bottom: 1px solid #efefef;
    div {
        p {
            color: red;
        }
    }
    @media screen and (max-width: 600px) {
        padding: 30px 20px;
    }
`
const StLabel = styled.div`
    display: block;
    font-size: 30px;
    margin-bottom: 10px;
`

const StInput = styled.input`
    width: 700px;
    border: none;
    padding: 10px 15px;
    border-radius: 15px;
    margin-bottom: 10px;
    @media screen and (max-width: 600px) {
        width: 400px;
        margin: 0;
    }
`

const StButton = styled.button`
    transition: all 0.3s;
    padding: 10px 15px;
    border-radius: 15px;
    border: none;
`


export default MemeCommentForm;