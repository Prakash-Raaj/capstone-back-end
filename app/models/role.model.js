import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: String,
  },

  { timestamps: true }
);

roleSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Role = mongoose.model("role", roleSchema);

export default Role;
