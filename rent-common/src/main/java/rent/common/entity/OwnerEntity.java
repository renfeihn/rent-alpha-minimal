package rent.common.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Собственник ЛС
 */
@Entity
@Table(name = OwnerEntity.TABLE_NAME, indexes = {
        @Index(columnList = OwnerEntity.Columns.ID),
        @Index(columnList = OwnerEntity.Columns.DOCUMENT_TYPE),
        @Index(columnList = OwnerEntity.Columns.DOCUMENT_SERIES),
        @Index(columnList = OwnerEntity.Columns.DOCUMENT_NUMBER),
        @Index(columnList = OwnerEntity.Columns.DOCUMENT_ISSUING_AUTHORITY),
        @Index(columnList = OwnerEntity.Columns.DOCUMENT_DATE_ISSUE)
})
public class OwnerEntity extends AbstractEntity {
    public static final String TABLE_NAME = "accounts_owners";

    public interface Columns extends AbstractEntity.Columns {
        String CITIZEN = "citizen_id";
        String ACCOUNT_OWNER = "account_owner_id";
        String DOCUMENT_TYPE = "document_type_id";
        String DOCUMENT_SERIES = "document_series";
        String DOCUMENT_NUMBER = "document_number";
        String DOCUMENT_ISSUING_AUTHORITY = "document_issuing_authority";
        String DOCUMENT_DATE_ISSUE = "document_date_issue";
        String DATE_START = "date_start";
        String DATE_END = "date_end";
    }

    /**
     * гражданин
     */
    @JoinColumn(name = Columns.CITIZEN)
    @ManyToOne(fetch = FetchType.LAZY)
    private CitizenEntity citizen;

    /**
     * вид документа
     */
    @JoinColumn(name = Columns.DOCUMENT_TYPE)
    @ManyToOne(fetch = FetchType.LAZY)
    private DocumentTypeEntity documentType;

    /**
     * документ серия
     */
    @Column(name = Columns.DOCUMENT_SERIES)
    private String documentSeries;

    /**
     * документ номер
     */
    @Column(name = Columns.DOCUMENT_NUMBER)
    private String documentNumber;

    /**
     * документ кем выдан
     */
    @Column(name = Columns.DOCUMENT_ISSUING_AUTHORITY)
    private String documentIssuingAuthority;

    /**
     * документ дата выдачи
     */
    @Column(name = Columns.DOCUMENT_DATE_ISSUE)
    private Date documentDateIssue;

    /**
     * прикреплённые документы
     */
    @JoinColumn(name = Columns.ACCOUNT_OWNER)
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OwnerDocumentAttachmentEntity> documentAttachments;

    /**
     * дата начала
     */
    @Column(name = Columns.DATE_START)
    private Date dateStart;

    /**
     * дата окончания
     */
    @Column(name = Columns.DATE_END)
    private Date dateEnd;

    public CitizenEntity getCitizen() {
        return citizen;
    }

    public void setCitizen(CitizenEntity citizen) {
        this.citizen = citizen;
    }

    public DocumentTypeEntity getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentTypeEntity documentType) {
        this.documentType = documentType;
    }

    public String getDocumentSeries() {
        return documentSeries;
    }

    public void setDocumentSeries(String documentSeries) {
        this.documentSeries = documentSeries;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public String getDocumentIssuingAuthority() {
        return documentIssuingAuthority;
    }

    public void setDocumentIssuingAuthority(String documentIssuingAuthority) {
        this.documentIssuingAuthority = documentIssuingAuthority;
    }

    public Date getDocumentDateIssue() {
        return documentDateIssue;
    }

    public void setDocumentDateIssue(Date documentDateIssue) {
        this.documentDateIssue = documentDateIssue;
    }

    public List<OwnerDocumentAttachmentEntity> getDocumentAttachments() {
        return documentAttachments;
    }

    public void setDocumentAttachments(List<OwnerDocumentAttachmentEntity> documentAttachments) {
        this.documentAttachments = documentAttachments;
    }

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
    }
}
