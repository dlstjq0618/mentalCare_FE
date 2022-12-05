import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { useFormContext } from "react-hook-form";
import {
    Input,
    FormRowItemWrapperSetting
} from "~/components"
import { rem } from "polished";
import { useSelector } from 'react-redux';
import { selectCounselingInfoData, selectCounselingProfileImage } from '~/store/calendarDetailSlice';
import { api } from '~/woozooapi';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 32,
    height: 32,
    border: `2px solid ${theme.palette.background.paper}`,
}));

export default function BadgeAvatars() {
    const { register, setValue, setError, trigger, getValues, formState, watch } =
        useFormContext();
    const router = useRouter();
    const userInfo = useSelector(selectCounselingInfoData);
    const [userImage, setUserImage] = useState()
    const url = useSelector(selectCounselingProfileImage);

    useEffect(() => {
        const userId = window?.localStorage?.getItem("userId");
        const id = Number(userId);
        api.counselor.info(id).then((res) => {
            setUserImage(res.image);
        })
    }, [])

    return (
        <>
            <FormRowItemWrapperSetting>
                <Input type="hidden" {...register("image")} />
                <Stack direction="row">
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <SmallAvatar alt="Remy Sharp" src="btn_edit_profile@2x.png" />
                        }
                    >
                        <Avatar sx={{ width: `${rem(124)}`, height: `${rem(124)}`, cursor: "pointer" }} alt="Travis Howard" src={!url ? userImage : url} />
                    </Badge>
                </Stack>
            </FormRowItemWrapperSetting>
        </>
    );
}