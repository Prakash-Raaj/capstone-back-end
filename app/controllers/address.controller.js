import db from '../models/index.js';

const Address = db.address;

export const createAddress = async (req, res) => {
  try {
    const {
      userId,
      street,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    const newAddress = new Address({
      userId: userId,
      street: street,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country,
      isDefault: isDefault || false,
    });

    const savedAddress = await newAddress.save();

    res.status(201).send(savedAddress);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Error occurred while creating an address.',
    });
  }
};

export const getAddressesByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;
    // console.log(userId);
    const addresses = await Address.find({ userId: userId });

    res.send(addresses);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Error occurred while retrieving addresses.',
    });
  }
};

export const updateAddressById = async (req, res) => {
  try {
    const addressId = req.params.id;
    const updateFields = req.body;
    console.log(addressId, 'This is my ID');

    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      updateFields,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).send({
        message: 'Address not found for update.',
      });
    }

    res.send(updatedAddress);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Error occurred while updating an address.',
    });
  }
};

export const deleteAddressById = async (req, res) => {
  try {
    const addressId = req.params.id;

    const deletedAddress = await Address.findByIdAndDelete(addressId);

    if (!deletedAddress) {
      return res.status(404).send({
        message: 'Address not found for deletion.',
      });
    }

    res.send({ message: 'Address deleted successfully!' });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Error occurred while deleting an address.',
    });
  }
};
