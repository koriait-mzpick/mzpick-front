export default interface SignUpRequestDto {
    name: string;
    user_id: string;
    password: string;
    tel_number: string;
    auth_number: string;
    join_path: string;
    sns_id: string | null;
}