import { nutrihealthModel } from "../models/nutrihealth.model.js";

const GetListOlderController = async (req, res) => {
  try {
    const data = await nutrihealthModel.ListOlderAdults();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const GetAllRepOlderController = async (req, res) => {
  try {
    const { identificacion } = req.body;
    const data = await nutrihealthModel.FindAllRepOlderByIdentification(
      identificacion
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// Validate Login
const ValidateLoginController = async (req, res) => {
  try {
    const { vl_idcard, vl_password } = req.body;
    const data = await nutrihealthModel.FindLogin(vl_idcard, vl_password);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
};

// Validate User
const ValidateUserController = async (req, res) => {
  try {
    const { vu_idcard } = req.body;
    const data = await nutrihealthModel.IsValidUser(vu_idcard);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const ValidateIdCardAdultController = async (req, res) => {
  try {
    const { idCardAdult } = req.body;
    const data = await nutrihealthModel.IsValidIdCardAdult(idCardAdult);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const ChangePasswordController = async (req, res) => {
  try {
    const { ch_identificacion, ch_password } = req.body;
    await nutrihealthModel.ChangePassword(ch_identificacion, ch_password);
    res.json({
      status: "success",
      message: "Se cambió correctamente la contraseña!",
    });
  } catch (error) {
    console.log(error);
  }
};

//REGISTER DATA
const RegisterAdminController = async (req, res) => {
  try {
    const {
      ad_idcard,
      ad_names,
      ad_lastnames,
      ad_gender,
      ad_cargo,
      ad_contacto,
      ad_email,
      ad_password,
    } = req.body;
    const response = await nutrihealthModel.RegisterAdmin(
      ad_idcard,
      ad_names,
      ad_lastnames,
      ad_gender,
      ad_cargo,
      ad_contacto,
      ad_email,
      ad_password
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const RegisterOlderAdultController = async (req, res) => {
  try {
    const {
      rp_idcard,
      oa_idcard,
      oa_names,
      oa_lastnames,
      oa_gender,
      oa_birthdate,
      oa_enfermedad,
      cr_correo,
      cr_password,
    } = req.body;
    const response = await nutrihealthModel.RegisterOlderAdult(
      rp_idcard,
      oa_idcard,
      oa_names,
      oa_lastnames,
      oa_gender,
      oa_birthdate,
      oa_enfermedad,
      cr_correo,
      cr_password
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const RegisterRepresentativeController = async (req, res) => {
  try {
    const {
      rp_idcard,
      rp_names,
      rp_lastnames,
      rp_gender,
      rp_parentesco,
      rp_contacto,
    } = req.body;

    const response = await nutrihealthModel.RegisterRepresentative(
      rp_idcard,
      rp_names,
      rp_lastnames,
      rp_gender,
      rp_parentesco,
      rp_contacto
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// EDIT DATA
const EditRepresentativeController = async (req, res) => {
  try {
    const {
      rp_idusuario,
      rp_idcard,
      rp_names,
      rp_lastnames,
      rp_gender,
      rp_parentesco,
      rp_contacto,
    } = req.body;

    const response = await nutrihealthModel.EditRepresentative(
      rp_idusuario,
      rp_idcard,
      rp_names,
      rp_lastnames,
      rp_gender,
      rp_parentesco,
      rp_contacto
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const EditOlderAdultController = async (req, res) => {
  try {
    const {
      oa_idusuario,
      oa_idcard,
      oa_names,
      oa_lastnames,
      oa_gender,
      oa_birthdate,
      oa_enfermedad,
    } = req.body;

    const response = await nutrihealthModel.EditOlderAdult(
      oa_idusuario,
      oa_idcard,
      oa_names,
      oa_lastnames,
      oa_gender,
      oa_birthdate,
      oa_enfermedad
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const nutrihealthController = {
  GetListOlderController,
  GetAllRepOlderController,
  ValidateLoginController,
  ValidateUserController,
  ValidateIdCardAdultController,
  ChangePasswordController,
  RegisterAdminController,
  RegisterOlderAdultController,
  RegisterRepresentativeController,
  EditRepresentativeController,
  EditOlderAdultController,
};
