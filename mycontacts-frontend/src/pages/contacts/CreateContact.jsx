import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuUser, LuMail, LuPhone } from "react-icons/lu";
import { useContacts } from "../../contexts/ContactContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { validateContactForm } from "../../utils/validators";
import { ROUTES } from "../../constants";
import styles from "./Contacts.module.css";

const CreateContact = () => {
  const { addContact } = useContacts();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    const result = await addContact(formData);
    setLoading(false);
    if (result.success) {
      navigate(ROUTES.CONTACTS);
    }
  };

  return (
    <div className={styles.formPage}>
      <Link to={ROUTES.CONTACTS} className={styles.backLink}>
        <LuArrowLeft /> Back to Contacts
      </Link>

      <div className={styles.formCard}>
        <h1 className={styles.formTitle}>Add New Contact</h1>
        <p className={styles.formSubtitle}>
          Fill in the details below to create a new contact.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            icon={<LuUser />}
            error={errors.name}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. john@example.com"
            icon={<LuMail />}
            error={errors.email}
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 234 567 8900"
            icon={<LuPhone />}
            error={errors.phone}
            required
          />

          <div className={styles.formActions}>
            <Button type="submit" loading={loading}>
              Create Contact
            </Button>
            <Link to={ROUTES.CONTACTS}>
              <Button variant="ghost">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
