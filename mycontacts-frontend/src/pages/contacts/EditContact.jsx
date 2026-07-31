import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuArrowLeft, LuUser, LuMail, LuPhone } from "react-icons/lu";
import { useContacts } from "../../contexts/ContactContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { validateContactForm } from "../../utils/validators";
import { ROUTES } from "../../constants";
import styles from "./Contacts.module.css";

const EditContact = () => {
  const { id } = useParams();
  const { currentContact, fetchContact, editContact, clearCurrentContact } =
    useContacts();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const load = async () => {
      const contact = await fetchContact(id);
      if (contact) {
        setFormData({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
        });
      }
      setFetching(false);
    };
    load();
    return () => clearCurrentContact();
  }, [id, fetchContact, clearCurrentContact]);

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
    const result = await editContact(id, formData);
    setLoading(false);
    if (result.success) {
      navigate(`/contacts/${id}`);
    }
  };

  if (fetching) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (!currentContact) {
    return (
      <div className={styles.formPage}>
        <Link to={ROUTES.CONTACTS} className={styles.backLink}>
          <LuArrowLeft /> Back to Contacts
        </Link>
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>Contact not found</h3>
          <p className={styles.emptyText}>
            The contact you're trying to edit doesn't exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formPage}>
      <Link to={`/contacts/${id}`} className={styles.backLink}>
        <LuArrowLeft /> Back to Contact
      </Link>

      <div className={styles.formCard}>
        <h1 className={styles.formTitle}>Edit Contact</h1>
        <p className={styles.formSubtitle}>
          Update the details for {currentContact.name}.
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
              Save Changes
            </Button>
            <Link to={`/contacts/${id}`}>
              <Button variant="ghost">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
