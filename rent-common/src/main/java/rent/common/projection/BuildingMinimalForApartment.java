package rent.common.projection;

import org.springframework.data.rest.core.config.Projection;
import rent.common.entity.BuildingEntity;

@Projection(types = {BuildingEntity.class})
public interface BuildingMinimalForApartment {
    StreetMinimalWithoutType getStreet();

    String getHouse();
}
