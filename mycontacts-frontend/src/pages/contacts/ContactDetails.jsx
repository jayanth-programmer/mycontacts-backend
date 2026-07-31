import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  LuArrowLeft,
  LuMail,
  LuPhone,
  LuCalendar,
  LuPencil,
  LuTrash2,
} from "react-icons/lu";
import { useContacts } from "../../contexts/ContactContext";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import { formatDateTime } from "../../utils/formatDate";
import { ROUTES } from "../../constants";
import styles from "./Contacts.module.css";

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentContact, fetchContact, removeContact, clearCurrentContact } =
    useContacts();
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      await fetchContact(id);
      setLoading(false);
    };
    load();
    return () => clearCurrentContact();
  }, [id, fetchContact, clearCurrentContact]);

  const handleDelete = async () => {
    setDeleting(true);
    const result = await removeContact(id);
    setDeleting(false);
    if (result.success) {
      navigate(ROUTES.CONTACTS);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (!currentContact) {
    return (
      <div className={styles.detailPage}>
        <Link to={ROUTES.CONTACTS} className={styles.backLink}>
          <LuArrowLeft /> Back to Contacts
        </Link>
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>Contact not found</h3>
          <p className={styles.emptyText}>
            The contact you're looking for doesn't exist or has been deleted.
          </p>
          <Link to={ROUTES.CONTACTS}>
            <Button>View All Contacts</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>
      <Link to={ROUTES.CONTACTS} className={styles.backLink}>
        <LuArrowLeft /> Back to Contacts
      </Link>

      <div className={styles.detailCard}>
        <div className={styles.detailHeader}>
          <Avatar name={currentContact.name} size="xl" />
          <h1 className={styles.detailName}>{currentContact.name}</h1>
        </div>

        <div className={styles.detailBody}>
          <div className={styles.detailRow}>
            <div className={styles.detailIcon}>
              <LuMail />
            </div>
            <div>
              <div className={styles.detailLabel}>Email</div>
              <div className={styles.detailValue}>{currentContact.email}</div>
            </div>
          </div>

          <div className={styles.detailRow}>
            <div className={styles.detailIcon}>
              <LuPhone />
            </div>
            <div>
              <div className={styles.detailLabel}>Phone</div>
              <div className={styles.detailValue}>{currentContact.phone}</div>
            </div>
          </div>

          <div className={styles.detailRow}>
            <div className={styles.detailIcon}>
              <LuCalendar />
            </div>
            <div>
              <div className={styles.detailLabel}>Added On</div>
              <div className={styles.detailValue}>
                {formatDateTime(currentContact.createdAt)}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.detailFooter}>
          <div className={styles.detailTimestamps}>
            <span>Created: {formatDateTime(currentContact.createdAt)}</span>
            <span>Updated: {formatDateTime(currentContact.updatedAt)}</span>
          </div>
          <div className={styles.detailActions}>
            <Link to={`/contacts/${id}/edit`}>
              <Button variant="secondary" icon={<LuPencil />} size="sm">
                Edit
              </Button>
            </Link>
            <Button
              variant="danger"
              icon={<LuTrash2 />}
              size="sm"
              onClick={() => setDeleteModal(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Contact"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" loading={deleting} onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p style={{ color: "var(--text-secondary)" }}>
          Are you sure you want to delete{" "}
          <strong style={{ color: "var(--text-primary)" }}>
            {currentContact.name}
          </strong>
          ? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default ContactDetails;
