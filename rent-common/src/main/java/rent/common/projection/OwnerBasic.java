package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.OwnerEntity;

import java.util.Date;
import java.util.List;

@Projection(types = {OwnerEntity.class})
public interface OwnerBasic extends AbstractBasic {
    CitizenBasic getCitizen();

    DocumentTypeBasic getDocumentType();

    String getDocumentSeries();

    String getDocumentNumber();

    String getDocumentIssuingAuthority();

    Date getDocumentDateIssue();

    List<OwnerDocumentAttachmentBasic> getDocumentAttachments();

    Date getDateStart();

    Date getDateEnd();
}
