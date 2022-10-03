import {Component, ContentChildren, DoCheck, Input, QueryList} from '@angular/core';
import {TabSlotDirective} from "./tab-slot.directive";

@Component({
  selector: 'tabs',
  standalone: true,
  template: '<ng-content></ng-content>'
})
export class TabsComponent implements DoCheck {
  @Input() selectedTabId: any;
  @ContentChildren(TabSlotDirective) slots: QueryList<TabSlotDirective>;

  ngDoCheck(): void {
    if (!this.slots) return;

    this.slots.forEach((slot: TabSlotDirective) => {
      slot.toggleVisibility(slot.id.toString() === this.selectedTabId);
    })
  }


}
