package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.CitizenDocumentAttachmentEntity;

@Projection(types = {CitizenDocumentAttachmentEntity.class})
public interface CitizenDocumentAttachmentBasic extends AbstractBasic {
    String getName();

    String getUrlLink();
}
