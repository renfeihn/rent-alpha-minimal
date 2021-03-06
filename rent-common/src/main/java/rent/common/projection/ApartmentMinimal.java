package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.ApartmentEntity;

@Projection(types = {ApartmentEntity.class})
public interface ApartmentMinimal {
    String getId();

    BuildingMinimalForApartment getBuilding();

    Integer getEntrance();

    Integer getFloor();

    String getApartment();

    String getTotalArea();

    String getLivingArea();

    Integer getRoomsNumber();
}
