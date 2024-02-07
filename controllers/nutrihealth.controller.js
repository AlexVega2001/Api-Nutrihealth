import { nutrihealthModel } from "../models/nutrihealth.model.js";

const getAllRepOlderController = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await nutrihealthModel.findAllRepOlderByEmail(email);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// Validate Login
const validateLogin = async (req, res) => {
  try {
    const { vl_email, vl_password } = req.body;
    const data = await nutrihealthModel.findLogin(vl_email, vl_password);
    if (data) {
      res.json({
        data,
        status: "success",
        message: "Login exitoso!",
      });
    } else {
      res.json({
        status: "error",
        message: "Login fallido!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//REGISTER DATA
const registerAdminController = async (req, res) => {
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
    const response = await nutrihealthModel.registerAdmin(
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

const registerOlderAdultController = async (req, res) => {
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
    const response = await nutrihealthModel.registerOlderAdult(
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

const registerRepresentativeController = async (req, res) => {
  try {
    const {
      rp_idcard,
      rp_names,
      rp_lastnames,
      rp_gender,
      rp_parentesco,
      rp_contacto,
    } = req.body;

    const response = await nutrihealthModel.registerRepresentative(
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
const editRepresentativeController = async (req, res) => {
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

    const response = await nutrihealthModel.editRepresentative(
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

const editOlderAdultController = async (req, res) => {
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

    const response = await nutrihealthModel.editOlderAdult(
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
  getAllRepOlderController,
  validateLogin,
  registerAdminController,
  registerOlderAdultController,
  registerRepresentativeController,
  editRepresentativeController,
  editOlderAdultController,
};
